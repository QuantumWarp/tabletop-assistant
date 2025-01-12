import {
  Entity,
  LayoutEntry,
} from '@tabletop-assistant/common';
import { useNavigate } from 'react-router-dom';
import LayoutPositionHelper from '../../helpers/layout-position.helper';
import { useGetEntityQuery, useUpdateValueMapMutation } from '../../store/api';
import LayoutDisplay from '../display/LayoutDisplay';
import { useMappingEntity } from '../../helpers/hooks/use-mapping-entities';

interface LayoutContainerEntryProps {
  entry: LayoutEntry,
  containerWidth: number;
}

export function LayoutContainerEntry({ entry, containerWidth }: LayoutContainerEntryProps) {
  const navigate = useNavigate();
  const { data: entity } = useGetEntityQuery(entry.entityId);

  const entityMappings = useMappingEntity(entry.entityId);
  const [updateMapping] = useUpdateValueMapMutation();

  const actionHandler = (entity: Entity, actionKey: string) => {
    navigate({
      pathname: '../action',
      search: `?entity=${entity.id}&action=${actionKey}`,
    });
  };

  const display = entity?.displays.find((x) => x.key === entry.displayKey);
  const invalidEntry = !entity || !display;

  return (
    <div
      key={`${entry.displayKey}-${entry.entityId}`}
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...LayoutPositionHelper.getPositionStyle(entry.position, containerWidth),
        ...LayoutPositionHelper.getSizeStyle(entry.size, containerWidth),
      }}
    >
      {invalidEntry && <div>Invalid entry</div>}

      {!invalidEntry && (
        <LayoutDisplay
          display={display}
          entity={entity}
          mappings={entityMappings}
          onUpdateMappings={async (updatedMappings) => {
            for (const mapping of updatedMappings) {
              await updateMapping(mapping);
            }
          }}
          onAction={(actionKey) => actionHandler(entity, actionKey)}
        />
      )}
    </div>
  );
};

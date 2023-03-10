import React from 'react';
import {
  Entity, Layout,
} from 'tabletop-assistant-common';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPositionHelper from '../../helpers/layout-position.helper';
import './LayoutContainer.css';
import { useGetEntitiesQuery } from '../../store/api';
import LayoutDisplay from '../display/LayoutDisplay';
import useElementWidth from '../../helpers/hooks/use-element-width';
import { useMappingEntities } from '../../helpers/hooks/use-mapping-entities';
import { useMappingUpdate } from '../../helpers/hooks/use-mapping-update';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const history = useHistory();
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { elementRef, width } = useElementWidth();

  const entityIds = layout.entries
    .map((x) => x.entityId)
    .filter((x, index, self) => self.indexOf(x) === index);

  const entityMappings = useMappingEntities(entityIds);
  const mappingUpdate = useMappingUpdate();

  const actionHandler = (entity: Entity, actionKey: string) => {
    history.push({
      pathname: './action',
      search: `?entity=${entity._id}&action=${actionKey}`,
    });
  };

  return (
    <div className="layout-container" ref={elementRef}>
      {layout.entries.map((entry) => {
        const entity = entities?.find((x) => entry.entityId === x._id);
        const display = entity?.displays.find((x) => x.key === entry.displayKey);
        const invalidEntry = !entity || !display;

        return (
          <div
            key={`${entry.displayKey}-${entry.entityId}`}
            className="entry"
            style={{
              ...LayoutPositionHelper.getPositionStyle(entry.position, width),
              ...LayoutPositionHelper.getSizeStyle(entry.size, width),
            }}
          >
            {invalidEntry && <div>Invalid entry</div>}

            {!invalidEntry && (
              <LayoutDisplay
                display={display}
                entity={entity}
                mappings={entityMappings?.find((x) => x.entityId === entity._id)?.mappings || []}
                onUpdateMappings={mappingUpdate}
                onAction={(actionKey) => actionHandler(entity, actionKey)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LayoutContainer;

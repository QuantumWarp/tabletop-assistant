import React from 'react';
import {
  Entity, Layout,
} from 'tabletop-assistant-common';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPositionHelper from '../../helpers/layout-position.helper';
import './LayoutContainer.css';
import { useGetEntitiesQuery } from '../../store/api';
import LayoutDisplay from '../display/LayoutDisplay';
import useMappingHelper from '../../helpers/hooks/use-mapping-helper';
import useElementWidth from '../../helpers/hooks/use-element-width';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const history = useHistory();
  const mappingHelper = useMappingHelper();
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { elementRef, width } = useElementWidth();

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
                mappings={mappingHelper.getForEntity(entity._id)}
                onUpdateMappings={(mappings) => mappingHelper.update(mappings)}
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

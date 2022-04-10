import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'tabletop-assistant-common';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPositionHelper from '../models/layout/layout-position';
import './LayoutContainer.css';
import { useGetAllValuesQuery, useGetEntitiesQuery, useUpdateValuesMutation } from '../store/api';
import DisplayType from '../helpers/display.type';
import LayoutDisplay from '../display/LayoutDisplay';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: values } = useGetAllValuesQuery(tabletopId);

  const [updateValues] = useUpdateValuesMutation();

  const history = useHistory();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="layout-container" ref={containerRef}>
      {layout.entries.map((entry, index) => {
        const entity = entities?.find((x) => entry.entityId === x._id);
        const display = entity?.displays.find((x) => x.type === entry.displayType);
        const entityValues = values?.find((x) => x.entityId === entry.entityId);

        // eslint-disable-next-line react/no-array-index-key
        if (!entity) return (<div key={index}>None</div>);
        // eslint-disable-next-line react/no-array-index-key
        if (!display) return (<div key={index}>None</div>);
        // eslint-disable-next-line react/no-array-index-key
        if (!entityValues) return (<div key={index}>None</div>);

        const slotClickHandler = (slot: string) => {
          const action = entity.actions.find((x) => x.key === display.mappings[slot]);
          if (!action) return;
          history.push({
            pathname: './action',
            search: `?entity=${entity._id}&action=${action.key}`,
          });
        };

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="entry"
            style={{
              ...LayoutPositionHelper.getPositionStyle(entry.position, containerWidth),
              ...LayoutPositionHelper.getSizeStyle(entry.size, containerWidth),
            }}
          >
            <LayoutDisplay
              type={entry.displayType as DisplayType}
              entity={entity}
              fieldMappings={entityValues.mappings}
              onSlot={slotClickHandler}
              onUpdateValues={(updatedValues) => updateValues({
                ...entityValues,
                mappings: {
                  ...entityValues.mappings,
                  ...updatedValues,
                },
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LayoutContainer;

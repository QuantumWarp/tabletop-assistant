import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
// import DisplayType from '../models/layout/display-type';
// import DisplaySimpleCard from '../display/DisplaySimpleCard';
// import DisplaySimpleToggle from '../display/DisplaySimpleToggle';
// import DisplayNumberSquare from '../display/DisplaySquare';
// import DisplayDotCounter from '../display/DisplayDotCounter';
import LayoutPositionHelper from '../models/layout/layout-position';
import './LayoutContainer.css';
import { useGetAllValuesQuery, useGetEntitiesQuery } from '../store/api';
import DisplayType from '../helpers/display.type';
import LayoutDisplay from '../display/LayoutDisplay';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: values } = useGetAllValuesQuery(tabletopId);

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

        const fieldValueMap = entity.fields.reduce((obj, field) => {
          const existingValue = entityValues.mappings[field.key];
          const value = existingValue !== undefined ? existingValue : field.initial;
          return { ...obj, [field.key]: value };
        }, {});

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
              slotFieldMappings={display.mappings}
              fieldValueMappings={fieldValueMap}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LayoutContainer;

import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'tabletop-assistant-common';
import { useAppSelector } from '../store/store';
import { selectObjects } from '../store/config-slice';
import DisplayType from '../models/layout/display-type';
import DisplaySimpleCard from '../display/DisplaySimpleCard';
import DisplaySimpleToggle from '../display/DisplaySimpleToggle';
import DisplayNumberSquare from '../display/DisplayNumberSquare';
import DisplayDotCounter from '../display/DisplayDotCounter';
import LayoutPositionHelper from '../models/layout/layout-position';
import './LayoutContainer.css';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const objects = useAppSelector(selectObjects);

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
      <div>
        {layout.entries.map((entry, index) => {
          const obj = objects.find((x) => entry.entityId === x.id);

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
              {obj && entry.displayType === DisplayType.simpleCard && (
                <DisplaySimpleCard
                  key={entry.entityId}
                  obj={obj}
                />
              )}
              {obj && entry.displayType === DisplayType.simpleToggle && (
                <DisplaySimpleToggle
                  key={entry.entityId}
                  obj={obj}
                />
              )}
              {obj && entry.displayType === DisplayType.numberSquare && (
                <DisplayNumberSquare
                  key={entry.entityId}
                  obj={obj}
                />
              )}
              {obj && entry.displayType === DisplayType.dotCounter && (
                <DisplayDotCounter
                  key={entry.entityId}
                  obj={obj}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutContainer;

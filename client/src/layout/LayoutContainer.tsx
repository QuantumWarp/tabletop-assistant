import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../store/store';
import { selectObjects } from '../store/config-slice';
import LayoutTab from '../models/layout/layout-tab';
import DisplayType from '../models/layout/display-type';
import DisplaySimpleCard from './DisplaySimpleCard';
import DisplaySimpleToggle from './DisplaySimpleToggle';
import DisplayNumberSquare from './DisplayNumberSquare';
import DisplayDotCounter from './DisplayDotCounter';
import { LayoutPositionHelper } from '../models/layout/layout-position';
import './LayoutContainer.css';

interface LayoutContainerProps {
  layout: LayoutTab,
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
        {layout.entries.map((entry) => {
          const obj = objects.find((x) => entry.objectId === x.id);

          return (
            <div
              key={entry.id}
              className="entry"
              style={{
                ...LayoutPositionHelper.getPositionStyle(entry.position, containerWidth),
                ...LayoutPositionHelper.getSizeStyle(entry.position, containerWidth),
              }}
            >
              {obj && entry.display === DisplayType.simpleCard && (
                <DisplaySimpleCard
                  key={entry.objectId}
                  obj={obj}
                />
              )}
              {obj && entry.display === DisplayType.simpleToggle && (
                <DisplaySimpleToggle
                  key={entry.objectId}
                  obj={obj}
                />
              )}
              {obj && entry.display === DisplayType.numberSquare && (
                <DisplayNumberSquare
                  key={entry.objectId}
                  obj={obj}
                />
              )}
              {obj && entry.display === DisplayType.dotCounter && (
                <DisplayDotCounter
                  key={entry.objectId}
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

import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectGameObjects } from '../../store/configuration-slice';
import LayoutTab from '../../models/layout/layout-tab';
import DisplayType from '../../models/layout/display-type';
import DisplaySimpleCard from './DisplaySimpleCard';
import DisplaySimpleToggle from './DisplaySimpleToggle';
import DisplayNumberSquare from './DisplayNumberSquare';
import DisplayDotCounter from './DisplayDotCounter';
import { LayoutPositionHelper } from '../../models/layout/layout-position';
import './LayoutContainer.css';

interface LayoutContainerProps {
  layout: LayoutTab,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div className="layout-container">
      <div>
        {layout.entries.map((entry) => {
          const obj = gameObjects.find((x) => entry.key === x.id);

          return (
            <div
              key={entry.id}
              className="entry"
              style={LayoutPositionHelper.getStyles(entry.position)}
            >
              {obj && entry.display === DisplayType.simpleCard && (
                <DisplaySimpleCard
                  key={entry.key}
                  gameObject={obj}
                />
              )}
              {obj && entry.display === DisplayType.simpleToggle && (
                <DisplaySimpleToggle
                  key={entry.key}
                  gameObject={obj}
                />
              )}
              {obj && entry.display === DisplayType.numberSquare && (
                <DisplayNumberSquare
                  key={entry.key}
                  gameObject={obj}
                />
              )}
              {obj && entry.display === DisplayType.dotCounter && (
                <DisplayDotCounter
                  key={entry.key}
                  gameObject={obj}
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

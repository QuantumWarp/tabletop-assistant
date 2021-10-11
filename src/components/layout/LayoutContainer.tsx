import React, { CSSProperties } from 'react';
import { useAppSelector } from '../../store/store';
import { selectGameObjects } from '../../store/configuration-slice';
import LayoutTab from '../../models/layout/layout-tab';
import DisplayType from '../../models/layout/display-type';
import DisplaySimpleCard from './DisplaySimpleCard';
import DisplaySimpleToggle from './DisplaySimpleToggle';
import DisplayNumberSquare from './DisplayNumberSquare';
import DisplayDotCounter from './DisplayDotCounter';
import { LayoutPositionHelper } from '../../models/layout/layout-position';

const classes: { [key: string]: CSSProperties } = {
  displayContainer: {
    position: 'relative',
    height: '1000px',
    width: '1000px',
    border: '1px solid black',
  },
};

interface LayoutContainerProps {
  tab: LayoutTab,
}

const LayoutContainer = ({ tab }: LayoutContainerProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div style={classes.displayContainer}>
      <div>
        {tab.entries.map((entry) => {
          const obj = gameObjects.find((x) => entry.key === x.id);

          return (
            <div
              key={entry.id}
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

import React, { CSSProperties } from 'react';
import DefaultDisplay from './DefaultDisplay';
import { useAppSelector } from '../store/store';
import { selectGameObjects } from '../store/main-slice';
import DotCounterDisplay from './DotCounterDisplay';
import LayoutTab from '../models/layout/layout-tab';
import DisplayType from '../models/layout/display-type';

const classes: { [key: string]: CSSProperties } = {
  displayContainer: {
    position: 'relative',
    height: '1000px',
    width: '1000px',
    border: '1px solid black',
  },
};

interface DisplayContainerProps {
  tab: LayoutTab,
}

const DisplayContainer = ({ tab }: DisplayContainerProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div style={classes.displayContainer}>
      <div>
        {tab.entries.map((entry) => {
          const obj = gameObjects.find((x) => entry.key === x.key);

          return (
            <div style={entry.position.styles}>
              {obj && entry.display === DisplayType.default && (
                <DefaultDisplay
                  key={entry.key}
                  gameObject={obj}
                />
              )}
              {obj && entry.display === DisplayType.dotCounter && (
                <DotCounterDisplay
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

export default DisplayContainer;

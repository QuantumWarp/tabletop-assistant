import React, { CSSProperties } from 'react';
import DefaultDisplay from './DefaultDisplay';
import { useAppSelector } from '../store/store';
import {
  selectGameObjects,
} from '../store/main-slice';
import DotCounterDisplay from './DotCounterDisplay';
import LayoutTab from '../models/layout/layout-tab';
import DisplayType from '../models/layout/display-type';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

interface DisplayContainerProps {
  tab: LayoutTab,
}

const DisplayContainer = ({ tab }: DisplayContainerProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div style={classes.app}>
      <div>
        {tab.entries.map((entry) => {
          const obj = gameObjects.find((x) => entry.key === x.key);

          return (
            <>
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayContainer;

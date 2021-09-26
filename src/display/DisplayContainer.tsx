import React, { CSSProperties } from 'react';
import layout from '../examples/layout';
import DefaultDisplay from './DefaultDisplay';
import { useAppSelector } from '../store/store';
import {
  selectGameObjects,
} from '../store/main-slice';
import DotCounterDisplay from './DotCounterDisplay';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const DisplayContainer = () => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div style={classes.app}>
      <div>
        {gameObjects.map((obj) => (
          <>
            {layout[obj.name] === 'default' && (
              <DefaultDisplay
                key={obj.name}
                gameObject={obj}
              />
            )}
            {layout[obj.name] === 'dot-counter' && (
              <DotCounterDisplay
                key={obj.name}
                gameObject={obj}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default DisplayContainer;

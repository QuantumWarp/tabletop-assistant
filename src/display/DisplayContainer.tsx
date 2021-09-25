import React, { CSSProperties } from 'react';
import DefaultDisplay from './DefaultDisplay';
import { useAppSelector } from '../store/store';
import {
  selectGameObjects,
} from '../store/main-slice';

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
          <DefaultDisplay
            key={obj.name}
            gameObject={obj}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayContainer;

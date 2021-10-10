import React, { CSSProperties } from 'react';
import GameObject from '../../models/objects/game-object';

const classes: { [key: string]: CSSProperties } = {
  counterDisplay: {
    display: 'flex',
  },
  name: {
    marginRight: '8px',
    fontWeight: 'bold',
  },
  dot: {
    border: '1px solid black',
    borderRadius: '50%',
    height: '20px',
    width: '20px',
    marginRight: '2px',
  },
  filled: {
    backgroundColor: 'black',
  },
};

interface DisplayDotCounterProps {
  gameObject: GameObject,
}

const DisplayDotCounter = ({ gameObject }: DisplayDotCounterProps) => (
  <div style={classes.counterDisplay}>
    <span style={classes.name}>{gameObject.name}</span>

    {Array(gameObject.value.max).fill(0).map((_x, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        style={{
          ...classes.dot,
          ...(index < gameObject.value.current - 1 ? classes.filled : {}),
        }}
      />
    ))}
  </div>
);

export default DisplayDotCounter;

import React, { CSSProperties } from 'react';
import GameObject from '../models/game-object';

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

interface DotCounterDisplayProps {
  gameObject: GameObject,
}

const DotCounterDisplay = ({ gameObject }: DotCounterDisplayProps) => (
  <div style={classes.counterDisplay}>
    <span style={classes.name}>{gameObject.name}</span>

    {Array(gameObject.value.max).fill(0).map((_x, index) => (
      <div style={{
        ...classes.dot,
        ...(index < gameObject.value.current - 1 ? classes.filled : {}),
      }}
      />
    ))}
  </div>
);

export default DotCounterDisplay;

import React from 'react';
import GameObject from '../../models/objects/game-object';
import './DisplayDotCounter.css';

interface DisplayDotCounterProps {
  gameObject: GameObject,
}

const DisplayDotCounter = ({ gameObject }: DisplayDotCounterProps) => (
  <div className="display-dot-counter">
    <span className="name">{gameObject.name}</span>

    {Array(gameObject.fields.maxValue).fill(0).map((_x, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={`dot${index < (gameObject.fields.value || 0) - 1 ? ' filled' : ''}`}
      />
    ))}
  </div>
);

export default DisplayDotCounter;

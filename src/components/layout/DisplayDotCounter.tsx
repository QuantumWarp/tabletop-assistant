import React from 'react';
import GameObject from '../../models/objects/game-object';
import './DisplayDotCounter.css';

interface DisplayDotCounterProps {
  obj: GameObject,
}

const DisplayDotCounter = ({ obj }: DisplayDotCounterProps) => (
  <div className="display-dot-counter">
    <span className="name">{obj.fields.title || obj.name}</span>

    {Array(obj.fields.secondaryValue).fill(0).map((_x, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={`dot${index < (obj.fields.value || 0) ? ' filled' : ''}`}
      />
    ))}
  </div>
);

export default DisplayDotCounter;

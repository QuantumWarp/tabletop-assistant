import React from 'react';
import GameObject from '../../models/objects/game-object';
import './DisplayNumberSquare.css';

interface DisplayNumberSquareProps {
  obj: GameObject,
}

const DisplayNumberSquare = ({ obj }: DisplayNumberSquareProps) => (
  <div className="display-number-square">
    <div className="container">
      <div className="number">
        {obj.fields.value}
      </div>

      <div className="name">
        {obj.fields.title || obj.name}
      </div>
    </div>
  </div>
);

export default DisplayNumberSquare;

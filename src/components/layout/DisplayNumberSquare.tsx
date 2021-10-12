import React from 'react';
import GameObject from '../../models/objects/game-object';
import './DisplayNumberSquare.css';

interface DisplayNumberSquareProps {
  gameObject: GameObject,
}

const DisplayNumberSquare = ({ gameObject }: DisplayNumberSquareProps) => (
  <div className="display-number-square">
    <div className="container">
      <div className="number">
        {gameObject.value}
      </div>

      <div className="name">
        {gameObject.name}
      </div>
    </div>
  </div>
);

export default DisplayNumberSquare;

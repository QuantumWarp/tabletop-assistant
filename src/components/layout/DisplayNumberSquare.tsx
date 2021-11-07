import React from 'react';
import GameObject from '../../models/objects/game-object';
import TabletopIcon from '../common/TabletopIcon';
import './DisplayNumberSquare.css';

interface DisplayNumberSquareProps {
  obj: GameObject,
}

const DisplayNumberSquare = ({ obj }: DisplayNumberSquareProps) => (
  <div className="display-number-square">
    <div className="container">
      <div className="header">
        <div className="icon">
          {obj.icon && <TabletopIcon icon={obj.icon} />}
        </div>

        <div className="secondary-value">
          {obj.fields.secondaryValue}
        </div>
      </div>

      <div className="value">
        {obj.fields.value}
      </div>

      <div className="name">
        {obj.fields.title || obj.name}
      </div>
    </div>
  </div>
);

export default DisplayNumberSquare;

import React from 'react';
import GameObject from '../../models/objects/game-object';
import { useAppDispatch } from '../../store/store';
import { upsertObject } from '../../store/config-slice';
import TabletopIcon from '../common/TabletopIcon';
import './DisplayNumberSquare.css';

interface DisplayNumberSquareProps {
  obj: GameObject,
}

const DisplayNumberSquare = ({ obj }: DisplayNumberSquareProps) => {
  const dispatch = useAppDispatch();

  const changeValue = (valueDelta: number) => {
    dispatch(upsertObject({
      ...obj,
      fields: {
        ...obj.fields,
        value: (obj.fields.value || 0) + valueDelta,
      },
    }));
  };

  return (
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

        <div className="click-left" onClick={() => changeValue(-1)} />
        <div className="click-right" onClick={() => changeValue(1)} />
      </div>
    </div>
  );
};

export default DisplayNumberSquare;

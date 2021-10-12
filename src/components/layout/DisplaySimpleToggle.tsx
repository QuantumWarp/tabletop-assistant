import React from 'react';
import GameObject from '../../models/objects/game-object';
import { setAction } from '../../store/configuration-slice';
import { useAppDispatch } from '../../store/store';
import './DisplaySimpleToggle.css';

interface DisplaySimpleToggleProps {
  gameObject: GameObject,
}

const DisplaySimpleToggle = ({ gameObject }: DisplaySimpleToggleProps) => {
  const dispatch = useAppDispatch();

  const dispatchFirstAction = () => {
    const action = gameObject.actions?.find((x) => x.trigger === 'manual');
    if (!action) return;
    dispatch(setAction(action.id));
  };

  return (
    <div
      className="display-simple-toggle"
      onClick={dispatchFirstAction}
    >
      <div className="title">
        {gameObject.name}
      </div>
    </div>
  );
};

export default DisplaySimpleToggle;

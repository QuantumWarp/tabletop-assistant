import React from 'react';
import GameObject from '../../models/objects/game-object';
import { selectObjectActions, setAction } from '../../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './DisplaySimpleToggle.css';

interface DisplaySimpleToggleProps {
  gameObject: GameObject,
}

const DisplaySimpleToggle = ({ gameObject }: DisplaySimpleToggleProps) => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector(selectObjectActions(gameObject.id));

  const dispatchFirstAction = () => {
    const firstAction = actions?.find((action) => action.triggers.find((x) => x.manual));
    if (!firstAction) return;
    dispatch(setAction(firstAction));
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

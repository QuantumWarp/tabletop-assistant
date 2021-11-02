import React from 'react';
import GameObject from '../../models/objects/game-object';
import { selectActions, setAction } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './DisplaySimpleToggle.css';

interface DisplaySimpleToggleProps {
  obj: GameObject,
}

const DisplaySimpleToggle = ({ obj }: DisplaySimpleToggleProps) => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector(selectActions);
  const objActions = actions.filter((x) => x.objectId === obj.id);

  const dispatchFirstAction = () => {
    const firstAction = objActions?.find((action) => action.triggers.find((x) => x.manual));
    if (!firstAction) return;
    dispatch(setAction(firstAction));
  };

  return (
    <div
      className="display-simple-toggle"
      onClick={dispatchFirstAction}
    >
      <div className="title">
        {obj.fields.title || obj.name}
      </div>
    </div>
  );
};

export default DisplaySimpleToggle;

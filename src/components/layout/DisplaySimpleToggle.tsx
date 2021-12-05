import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import GameObject from '../../models/objects/game-object';
import { selectActions, setAction, upsertObject } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './DisplaySimpleToggle.css';

interface DisplaySimpleToggleProps {
  obj: GameObject,
}

const DisplaySimpleToggle = ({ obj }: DisplaySimpleToggleProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const actions = useAppSelector(selectActions);
  const objActions = actions.filter((x) => x.objectId === obj.id);

  const dispatchFirstAction = () => {
    const firstAction = objActions?.find((action) => action.triggers.find((x) => x.manual));
    if (!firstAction) return;
    dispatch(setAction(firstAction));
    history.push('./action');
  };

  const toggle = () => {
    dispatch(upsertObject({
      ...obj,
      fields: {
        ...obj.fields,
        toggle: !obj.fields.toggle,
      },
    }));
  };

  return (
    <div
      className="display-simple-toggle"
    >
      <Box
        className="dot"
        sx={{
          border: 1,
          borderColor: 'custom.dot.border',
          backgroundColor: obj.fields.toggle ? 'custom.dot.background' : 'none',
        }}
        onClick={() => toggle()}
      />

      <div
        className="title"
        onClick={dispatchFirstAction}
      >
        {obj.fields.title || obj.name}
      </div>
    </div>
  );
};

export default DisplaySimpleToggle;

import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import GameObject from '../../models/objects/game-object';
import { selectActions, setAction } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import './DisplaySimpleCard.css';

interface DisplaySimpleCardProps {
  obj: GameObject,
}

const DisplaySimpleCard = ({ obj }: DisplaySimpleCardProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const actions = useAppSelector(selectActions);
  const objActions = actions.filter((x) => x.objectId === obj.id);
  const firstAction = objActions?.find((action) => action.triggers.find((x) => x.manual));

  return (
    <div className="display-simple-card">
      <div className="container">
        {obj.icon && (
          <div className="icon">
            <TabletopIcon icon={obj.icon} />
          </div>
        )}

        <div className="content">
          <div className="header">
            {obj.fields.title || obj.name}
          </div>

          <div>{obj.fields.text || obj.description}</div>
        </div>

        {firstAction && (
          <Button
            key={firstAction.id}
            className="action"
            type="button"
            onClick={() => { dispatch(setAction(firstAction)); history.push('./action'); }}
          >
            {firstAction.name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DisplaySimpleCard;

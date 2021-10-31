import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import GameObject from '../../models/objects/game-object';
import { selectObjectActions, setAction } from '../../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import './DisplaySimpleCard.css';

interface DisplaySimpleCardProps {
  gameObject: GameObject,
}

const DisplaySimpleCard = ({ gameObject }: DisplaySimpleCardProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const actions = useAppSelector(selectObjectActions(gameObject.id));
  const firstAction = actions?.find((action) => action.triggers.find((x) => x.manual));

  return (
    <div className="display-simple-card">
      <div className="container">
        {gameObject.icon && (
          <div className="icon">
            <TabletopIcon icon={gameObject.icon} />
          </div>
        )}

        <div className="content">
          <div className="header">
            {gameObject.fields.title || gameObject.name}
          </div>

          <div>{gameObject.fields.text || gameObject.description}</div>
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

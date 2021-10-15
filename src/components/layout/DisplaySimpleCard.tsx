import React from 'react';
import GameObject from '../../models/objects/game-object';
import { selectObjectActions, setAction } from '../../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './DisplaySimpleCard.css';

interface DisplaySimpleCardProps {
  gameObject: GameObject,
}

const DisplaySimpleCard = ({ gameObject }: DisplaySimpleCardProps) => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector(selectObjectActions(gameObject.id));

  return (
    <div className="display-simple-card">
      <div className="container">
        <div className="header">
          <div className="title">{gameObject.name}</div>

          <div className="actions">
            {actions
              ?.filter((action) => action.triggers.find((x) => x.manual))
              .map((action) => (
                <button
                  key={action.id}
                  className="action"
                  type="button"
                  onClick={() => dispatch(setAction(action))}
                >
                  {action.name}
                </button>
              ))}
          </div>
        </div>

        <div>{gameObject.description}</div>
      </div>
    </div>
  );
};

export default DisplaySimpleCard;

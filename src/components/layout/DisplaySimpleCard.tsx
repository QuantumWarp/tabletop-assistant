import React from 'react';
import GameObject from '../../models/objects/game-object';
import { setAction } from '../../store/configuration-slice';
import { useAppDispatch } from '../../store/store';
import './DisplaySimpleCard.css';

interface DisplaySimpleCardProps {
  gameObject: GameObject,
}

const DisplaySimpleCard = ({ gameObject }: DisplaySimpleCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="display-simple-card">
      <div className="container">
        <div className="header">
          <div className="title">{gameObject.name}</div>

          <div className="actions">
            {gameObject.actions
              ?.filter((x) => x.trigger === 'manual')
              .map((action) => (
                <button
                  key={action.id}
                  className="action"
                  type="button"
                  onClick={() => dispatch(setAction(action.id))}
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

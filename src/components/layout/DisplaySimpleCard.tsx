import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import GameObject from '../../models/objects/game-object';
import { selectActions, setAction, upsertObject } from '../../store/config-slice';
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

  const adjustAmount = (index: number) => {
    const increasing = index + 1 > (obj.fields.value || 0);

    dispatch(upsertObject({
      ...obj,
      fields: {
        ...obj.fields,
        value: index + (increasing ? 1 : 0),
      },
    }));
  };

  return (
    <div className="display-simple-card">
      <div className={`container${obj.disabled ? ' disabled' : ''}`}>
        {obj.icon && (
          <div
            className="icon"
            onClick={() => dispatch(upsertObject({ ...obj, disabled: !obj.disabled }))}
          >
            <TabletopIcon icon={obj.icon} />
          </div>
        )}

        <div className="content">
          <div className="header">
            <span>{obj.fields.title || obj.name}</span>

            {obj.fields.secondaryValue && (
              <div className="dots">
                {Array(obj.fields.secondaryValue).fill(0).map((_x, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={`dot${index < (obj.fields.value || 0) ? ' filled' : ''}`}
                    onClick={() => adjustAmount(index)}
                  />
                ))}
              </div>
            )}

            {!obj.fields.secondaryValue && obj.fields.value}
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

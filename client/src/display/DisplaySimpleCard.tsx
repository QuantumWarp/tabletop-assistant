import { Box, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GameObject from '../models/objects/game-object';
import { selectActions, setAction, upsertObject } from '../store/config-slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import TabletopIcon from '../common/TabletopIcon';
import './DisplaySimpleCard.css';
import EntitySummaryDialog from '../layout/EntitySummaryDialog';

interface DisplaySimpleCardProps {
  obj: GameObject,
}

const DisplaySimpleCard = ({ obj }: DisplaySimpleCardProps) => {
  const dispatch = useAppDispatch();
  const [objectInfoOpen, setObjectInfoOpen] = useState<boolean>(false);
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
      <Box
        className={`container${obj.disabled ? ' disabled' : ''}`}
        sx={{
          border: 1,
          borderColor: 'custom.layout.border',
          backgroundColor: 'custom.layout.background',
        }}
      >
        {obj.icon && (
          <>
            <Button
              className="icon"
              type="button"
              onClick={() => dispatch(upsertObject({ ...obj, disabled: !obj.disabled }))}
            >
              <TabletopIcon icon={obj.icon} />
            </Button>

            <Divider orientation="vertical" />
          </>
        )}

        <Button
          className="content"
          type="button"
          onClick={() => setObjectInfoOpen(true)}
        >
          <div className="header">
            <span>{obj.fields.title || obj.name}</span>

            {obj.fields.secondaryValue && (
              <div className="dots">
                {Array(obj.fields.secondaryValue).fill(0).map((_x, index) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="dot"
                    sx={{
                      border: 1,
                      borderColor: 'custom.dot.border',
                      backgroundColor: index < (obj.fields.value || 0) ? 'custom.dot.background' : 'none',
                    }}
                    onClick={(e) => { adjustAmount(index); e.stopPropagation(); }}
                  />
                ))}
              </div>
            )}

            {!obj.fields.secondaryValue && obj.fields.value}
          </div>

          <div>{obj.fields.text || obj.description}</div>
        </Button>

        {firstAction && (
          <>
            <Divider orientation="vertical" />

            <Button
              key={firstAction.id}
              disabled={obj.disabled}
              className="action"
              type="button"
              onClick={() => { dispatch(setAction(firstAction)); history.push('./action'); }}
            >
              {firstAction.name}
            </Button>
          </>
        )}
      </Box>

      {objectInfoOpen && (
        <EntitySummaryDialog
          obj={obj}
          open={objectInfoOpen}
          onClose={() => setObjectInfoOpen(false)}
        />
      )}
    </div>
  );
};

export default DisplaySimpleCard;

import React from 'react';
import { Box, Button } from '@mui/material';
import GameObject from '../models/objects/game-object';
import { useAppDispatch } from '../store/store';
import { upsertObject } from '../store/config-slice';
import TabletopIcon from '../common/TabletopIcon';
import './DisplayNumberSquare.css';

interface DisplayNumberSquareProps {
  obj: GameObject,
}

const DisplayNumberSquare = ({ obj }: DisplayNumberSquareProps) => {
  const dispatch = useAppDispatch();

  const changeValue = (valueDelta: number) => {
    dispatch(upsertObject({
      ...obj,
      fields: {
        ...obj.fields,
        value: (obj.fields.value || 0) + valueDelta,
      },
    }));
  };

  return (
    <div className="display-number-square">
      <Box
        className={`container${obj.disabled ? ' disabled' : ''}`}
        sx={{
          border: 1,
          borderColor: 'custom.layout.border',
          backgroundColor: 'custom.layout.background',
        }}
      >
        <div className="header">
          <Box
            className="icon"
            sx={{
              borderRight: 1,
              borderBottom: 1,
              borderColor: 'custom.layout.border',
            }}
          >
            {obj.icon && <TabletopIcon icon={obj.icon} />}
          </Box>

          {obj.fields.secondaryValue && (
            <Box
              className="secondary-value"
              sx={{
                borderLeft: 1,
                borderBottom: 1,
                borderColor: 'custom.layout.border',
              }}
            >
              {obj.fields.secondaryValue}
            </Box>
          )}
        </div>

        <div className="value">
          {obj.fields.value}
        </div>

        <div className="name">
          {obj.fields.title || obj.name}
        </div>

        {!obj.disabled && (
          <>
            <Button type="button" className="click-left" onClick={() => !obj.disabled && changeValue(-1)} />
            <Button type="button" className="click-right" onClick={() => !obj.disabled && changeValue(1)} />
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplayNumberSquare;

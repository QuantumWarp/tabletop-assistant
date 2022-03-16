import { Box } from '@mui/material';
import React from 'react';
import GameObject from '../models/objects/game-object';
import { upsertObject } from '../store/config-slice';
import { useAppDispatch } from '../store/store';
import './DisplayDotCounter.css';

interface DisplayDotCounterProps {
  obj: GameObject,
}

const DisplayDotCounter = ({ obj }: DisplayDotCounterProps) => {
  const dispatch = useAppDispatch();

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
    <div className="display-dot-counter">
      <span className="name">{obj.fields.title || obj.name}</span>

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
          onClick={() => adjustAmount(index)}
        />
      ))}
    </div>
  );
};

export default DisplayDotCounter;

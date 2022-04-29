import { Box } from '@mui/material';
import React from 'react';
import FixedActions, { FixedActionArg } from '../helpers/action.helper';
import DotsDisplay from '../helpers/displays/dots.display';
import './DisplayDots.css';

interface DisplayDotsProps {
  preview: boolean,
  slots: DotsDisplay,
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayDots = ({
  preview, slots, onSlot, onOperation,
}: DisplayDotsProps) => (
  <div className={`display-dots ${preview ? 'preview' : ''}`}>
    <span
      className="name"
      onClick={() => onSlot('action')}
    >
      {slots.name}
    </span>

    {Array(Number(slots.maximum)).fill(0).map((_x, index) => {
      const filled = index < (slots.current || 0);

      return (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="dot"
          sx={{
            border: 1,
            borderColor: 'custom.dot.border',
            backgroundColor: filled ? 'custom.dot.background' : 'none',
          }}
          onClick={() => onOperation(
            FixedActions.SetValue,
            { slot: 'current' },
            { value: index === 0 && slots.current === 1 ? 0 : index + 1 },
          )}
        />
      );
    })}
  </div>
);

export default DisplayDots;

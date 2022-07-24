import { Box } from '@mui/material';
import React from 'react';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';
import { SlotFieldValue } from '../../models/slot-field-value';
import './DisplayDots.css';

interface DisplayDotsProps {
  preview: boolean,
  slots: SlotFieldValue[],
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayDots = ({
  preview, slots, onSlot, onOperation,
}: DisplayDotsProps) => {
  const name = slots.find((x) => x.slotKey === 'name')?.value;
  const value = slots.find((x) => x.slotKey === 'value')?.value;
  const maximum = slots.find((x) => x.slotKey === 'maximum')?.value;

  return (
    <div className={`display-dots ${preview ? 'preview' : ''}`}>
      <span
        className="name"
        onClick={() => onSlot('action')}
      >
        {name}
      </span>

      {maximum && Array(Number(maximum)).fill(0).map((_x, index) => {
        const filled = index < (value || 0);

        return (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}-${filled}`}
            className="dot"
            sx={{
              border: 1,
              borderColor: 'custom.dot.border',
              backgroundColor: filled ? 'custom.dot.background' : 'none',
            }}
            onClick={() => onOperation(
              FixedActions.SetValue,
              { slot: 'current' },
              { value: index === 0 && value === 1 ? 0 : index + 1 },
            )}
          />
        );
      })}
    </div>
  );
};

export default DisplayDots;

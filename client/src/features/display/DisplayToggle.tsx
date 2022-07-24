import React from 'react';
import { Box } from '@mui/material';
import './DisplayToggle.css';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';
import { SlotFieldValue } from '../../models/slot-field-value';

interface DisplayToggleProps {
  preview: boolean,
  slots: SlotFieldValue[],
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayToggle = ({
  preview, slots, onSlot, onOperation,
}: DisplayToggleProps) => {
  const name = slots.find((x) => x.slotKey === 'name')?.value;
  const toggle = slots.find((x) => x.slotKey === 'toggle')?.value;

  return (
    <div className={`display-toggle ${preview ? 'preview' : ''}`}>
      <Box
        className="dot"
        sx={{
          border: 1,
          borderColor: 'custom.dot.border',
          backgroundColor: toggle ? 'custom.dot.background' : 'none',
        }}
        onClick={() => onOperation(FixedActions.Toggle, { slot: 'toggle' })}
      />

      <div
        className="title"
        onClick={() => onSlot('action')}
      >
        {name}
      </div>
    </div>
  );
};

export default DisplayToggle;

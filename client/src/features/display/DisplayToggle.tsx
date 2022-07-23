import React from 'react';
import { Box } from '@mui/material';
import './DisplayToggle.css';
import ToggleDisplay from '../../helpers/displays/toggle.display';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';

interface DisplayToggleProps {
  preview: boolean,
  slots: ToggleDisplay,
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayToggle = ({
  preview, slots, onSlot, onOperation,
}: DisplayToggleProps) => (
  <div className={`display-toggle ${preview ? 'preview' : ''}`}>
    <Box
      className="dot"
      sx={{
        border: 1,
        borderColor: 'custom.dot.border',
        backgroundColor: slots.toggle ? 'custom.dot.background' : 'none',
      }}
      onClick={() => onOperation(FixedActions.Toggle, { slot: 'toggle' })}
    />

    <div
      className="title"
      onClick={() => onSlot('action')}
    >
      {slots.name}
    </div>
  </div>
);

export default DisplayToggle;

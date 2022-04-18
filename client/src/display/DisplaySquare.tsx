import React from 'react';
import { Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import './DisplaySquare.css';
import SquareDisplay from '../helpers/displays/square.display';
import FixedActions from '../helpers/action.helper';

interface DisplaySquareProps {
  preview: boolean,
  slots: SquareDisplay,
  onOperation: (operation: FixedActions, ...slotArguments: string[]) => void,
}

const DisplaySquare = ({
  preview, slots, onOperation,
}: DisplaySquareProps) => (
  <div className={`display-square ${preview ? 'preview' : ''}`}>
    <Box
      className={`container ${slots.disabled ? 'disabled' : ''}`}
      sx={{ borderColor: 'custom.layout.border', backgroundColor: 'custom.layout.background' }}
    >
      <div className="header">
        {slots.icon && (
          <Box
            className="icon"
            sx={{ borderColor: 'custom.layout.border' }}
          >
            {slots.icon && <Icon icon={slots.icon} />}
          </Box>
        )}

        {slots.secondaryValue && (
          <Box
            className="secondary-value"
            sx={{ borderColor: 'custom.layout.border' }}
          >
            {slots.secondaryValue}
          </Box>
        )}
      </div>

      <div className="value">
        {slots.value}
      </div>

      <div className="name">
        {slots.name}
      </div>

      {!slots.disabled && (
        <>
          <Button
            type="button"
            className="click-left"
            onClick={() => onOperation(FixedActions.Decrement, 'value')}
          />
          <Button
            type="button"
            className="click-right"
            onClick={() => onOperation(FixedActions.Increment, 'value')}
          />
        </>
      )}
    </Box>
  </div>
);

export default DisplaySquare;

import React from 'react';
import { Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import './DisplaySquare.css';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';
import { SlotFieldValue } from '../../models/slot-field-value';

interface DisplaySquareProps {
  preview: boolean,
  slots: SlotFieldValue[],
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplaySquare = ({
  preview, slots, onOperation,
}: DisplaySquareProps) => {
  const name = slots.find((x) => x.slotKey === 'name')?.value;
  const icon = slots.find((x) => x.slotKey === 'icon')?.value;
  const disabled = slots.find((x) => x.slotKey === 'disabled')?.value;
  const value = slots.find((x) => x.slotKey === 'value')?.value;
  const secondaryValue = slots.find((x) => x.slotKey === 'secondaryValue')?.value;

  return (
    <div className={`display-square ${preview ? 'preview' : ''}`}>
      <Box
        className={`container ${disabled ? 'disabled' : ''}`}
        sx={{ borderColor: 'custom.layout.border', backgroundColor: 'custom.layout.background' }}
      >
        <div className="header">
          {icon && (
            <Box
              className="icon"
              sx={{ borderColor: 'custom.layout.border' }}
            >
              {icon && <Icon icon={icon} />}
            </Box>
          )}

          {secondaryValue && (
            <Box
              className="secondary-value"
              sx={{ borderColor: 'custom.layout.border' }}
            >
              {secondaryValue}
            </Box>
          )}
        </div>

        <div className="value">
          {value}
        </div>

        <div
          className="name"
          onClick={() => onOperation(FixedActions.Detail)}
        >
          {name}
        </div>

        {!disabled && (
          <>
            <Button
              type="button"
              className="click-left"
              onClick={() => onOperation(FixedActions.Decrement, { slot: 'value' })}
            />
            <Button
              type="button"
              className="click-right"
              onClick={() => onOperation(FixedActions.Increment, { slot: 'value' })}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplaySquare;

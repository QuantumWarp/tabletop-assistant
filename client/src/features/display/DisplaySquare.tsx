import React from 'react';
import { Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import './DisplaySquare.css';
import FixedActions from '../../helpers/operation.helper';
import { SlotMapping } from '../../models/slot-mapping';
import DisplayHelper from '../../helpers/display.helper';

interface DisplaySquareProps {
  preview: boolean,
  mappings: SlotMapping[],
  onOperation: (operation: FixedActions, ...args: SlotMapping[]) => void,
}

const DisplaySquare = ({
  preview, mappings, onOperation,
}: DisplaySquareProps) => {
  const name = mappings.find((x) => x.slotKey === 'name');
  const icon = mappings.find((x) => x.slotKey === 'icon');
  const value = mappings.find((x) => x.slotKey === 'value');
  const secondaryValue = mappings.find((x) => x.slotKey === 'secondaryValue');

  return (
    <div className={`display-square ${preview ? 'preview' : ''}`}>
      <Box
        className={`container ${DisplayHelper.isDisabled(mappings) ? 'disabled' : ''}`}
        sx={{ borderColor: 'custom.layout.border', backgroundColor: 'custom.layout.background' }}
      >
        <div className="header">
          {icon && (
            <Box
              className="icon"
              sx={{ borderColor: 'custom.layout.border' }}
            >
              {icon && <Icon icon={icon?.value} />}
            </Box>
          )}

          {secondaryValue && (
            <Box
              className="secondary-value"
              sx={{ borderColor: 'custom.layout.border' }}
            >
              {secondaryValue?.value}
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
          {name?.value}
        </div>

        {!DisplayHelper.isDisabled(mappings) && (
          <>
            <Button
              type="button"
              className="click-left"
              onClick={() => value && onOperation(FixedActions.Decrement, value)}
            />
            <Button
              type="button"
              className="click-right"
              onClick={() => value && onOperation(FixedActions.Increment, value)}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplaySquare;

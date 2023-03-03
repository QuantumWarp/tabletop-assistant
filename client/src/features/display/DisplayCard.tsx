import { Box, Button, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import React from 'react';
import './DisplayCard.css';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';
import DisplayHelper from '../../helpers/display.helper';
import { SlotMapping } from '../../models/slot-mapping.js';

interface DisplayCardProps {
  preview: boolean,
  mappings: SlotMapping[],
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayCard = ({
  preview, mappings, onSlot, onOperation,
}: DisplayCardProps) => {
  const name = mappings.find((x) => x.slotKey === 'name')?.value;
  const description = mappings.find((x) => x.slotKey === 'description')?.value;
  const icon = mappings.find((x) => x.slotKey === 'icon')?.value;
  const current = mappings.find((x) => x.slotKey === 'current')?.value;
  const maximum = mappings.find((x) => x.slotKey === 'maximum')?.value;
  const action = mappings.find((x) => x.slotKey === 'action')?.value;

  return (
    <div className={`display-card ${preview ? 'preview' : ''}`}>
      <Box
        className={`container ${DisplayHelper.isDisabled(mappings) ? 'disabled' : ''}`}
        sx={{
          border: 1,
          borderColor: 'custom.layout.border',
          backgroundColor: 'custom.layout.background',
        }}
      >
        {icon && (
          <>
            <Button
              className="icon"
              type="button"
              onClick={() => onOperation(FixedActions.Toggle, { slot: 'enabled' }, { slot: 'disabled' })}
            >
              <Icon icon={icon} />
            </Button>

            <Divider orientation="vertical" />
          </>
        )}

        <Button
          className="content"
          type="button"
          onClick={() => onOperation(FixedActions.Detail)}
        >
          <div className="header">
            <span>{name?.value}</span>

            {maximum && (
              <div className="dots">
                {Array(maximum).fill(0).map((_x, index) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="dot"
                    sx={{
                      border: 1,
                      borderColor: 'custom.dot.border',
                      backgroundColor: index < (current || 0) ? 'custom.dot.background' : 'none',
                    }}
                  />
                ))}
              </div>
            )}

            {!maximum && current}
          </div>

          <div>{description}</div>
        </Button>

        {action && (
          <>
            <Divider orientation="vertical" />

            <Button
              className="action"
              type="button"
              onClick={() => onSlot('action')}
            >
              {action}
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplayCard;

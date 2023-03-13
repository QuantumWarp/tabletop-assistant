import { Box, Button, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import React from 'react';
import './DisplayCard.css';
import FixedActions from '../../helpers/operation.helper';
import DisplayHelper from '../../helpers/display.helper';
import { SlotMapping } from '../../models/slot-mapping';

interface DisplayCardProps {
  preview: boolean,
  mappings: SlotMapping[],
  onAction: (slot: SlotMapping) => void,
  onOperation: (operation: FixedActions, ...args: SlotMapping[]) => void,
}

const DisplayCard = ({
  preview, mappings, onAction, onOperation,
}: DisplayCardProps) => {
  const enabled = mappings.find((x) => x.slotKey === 'enabled');
  const disabled = mappings.find((x) => x.slotKey === 'disabled');
  const name = mappings.find((x) => x.slotKey === 'name');
  const description = mappings.find((x) => x.slotKey === 'description');
  const icon = mappings.find((x) => x.slotKey === 'icon');
  const current = mappings.find((x) => x.slotKey === 'current');
  const maximum = mappings.find((x) => x.slotKey === 'maximum');
  const action = mappings.find((x) => x.slotKey === 'action');

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
              onClick={() => onOperation(
                FixedActions.Toggle,
                ...[enabled, disabled].filter((x): x is SlotMapping => Boolean(x)),
              )}
            >
              <Icon icon={icon?.value} />
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
                {Array(maximum?.value).fill(0).map((_x, index) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="dot"
                    sx={{
                      border: 1,
                      borderColor: 'custom.dot.border',
                      backgroundColor: index < (current?.value || 0) ? 'custom.dot.background' : 'none',
                    }}
                  />
                ))}
              </div>
            )}

            {!maximum && current?.formattedValue}
          </div>

          <div>{description?.value}</div>
        </Button>

        {action && (
          <>
            <Divider orientation="vertical" />

            <Button
              className="action"
              type="button"
              onClick={() => onAction(action)}
            >
              {action.fieldKey}
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplayCard;

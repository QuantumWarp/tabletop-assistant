import { Box, Button, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import React from 'react';
import './DisplayCard.css';
import CardDisplay from '../../helpers/displays/card.display';
import FixedActions, { FixedActionArg } from '../../helpers/action.helper';
import DisplayHelper from '../../helpers/display.helper';

interface DisplayCardProps {
  preview: boolean,
  slots: CardDisplay,
  onSlot: (slot: string) => void,
  onOperation: (operation: FixedActions, ...args: FixedActionArg[]) => void,
}

const DisplayCard = ({
  preview, slots, onSlot, onOperation,
}: DisplayCardProps) => (
  <div className={`display-card ${preview ? 'preview' : ''}`}>
    <Box
      className={`container ${DisplayHelper.isDisabled(slots) ? 'disabled' : ''}`}
      sx={{
        border: 1,
        borderColor: 'custom.layout.border',
        backgroundColor: 'custom.layout.background',
      }}
    >
      {slots.icon && (
        <>
          <Button
            className="icon"
            type="button"
            onClick={() => onOperation(FixedActions.Toggle, { slot: 'enabled' }, { slot: 'disabled' })}
          >
            <Icon icon={slots.icon} />
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
          <span>{slots.name}</span>

          {slots.maximum && (
            <div className="dots">
              {Array(slots.maximum).fill(0).map((_x, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="dot"
                  sx={{
                    border: 1,
                    borderColor: 'custom.dot.border',
                    backgroundColor: index < (slots.current || 0) ? 'custom.dot.background' : 'none',
                  }}
                />
              ))}
            </div>
          )}

          {!slots.maximum && slots.current}
        </div>

        <div>{slots.description}</div>
      </Button>

      {slots.action && (
        <>
          <Divider orientation="vertical" />

          <Button
            className="action"
            type="button"
            onClick={() => onSlot('action')}
          >
            {slots.action}
          </Button>
        </>
      )}
    </Box>
  </div>
);

export default DisplayCard;

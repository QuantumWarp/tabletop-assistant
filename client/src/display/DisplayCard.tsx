import { Box, Button, Divider } from '@mui/material';
import React from 'react';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';
import './DisplayCard.css';
import CardDisplay from '../helpers/displays/card.display';

interface DisplayCardProps {
  preview: boolean,
  slots: CardDisplay,
  onClick: (slot: string) => void,
}

const DisplayCard = ({
  preview, slots, onClick,
}: DisplayCardProps) => (
  <div className={`display-card ${preview ? 'preview' : ''}`}>
    <Box
      className={`container${slots.disabled ? ' disabled' : ''}`}
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
          >
            <TabletopIcon icon={slots.icon as TabletopIconType} />
          </Button>

          <Divider orientation="vertical" />
        </>
      )}

      <Button
        className="content"
        type="button"
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
            key={slots.action}
            className="action"
            type="button"
            onClick={() => onClick(slots.action)}
          >
            {slots.action}
          </Button>
        </>
      )}
    </Box>

    {/* {objectInfoOpen && (
      <EntitySummaryDialog
        obj={obj}
        open={objectInfoOpen}
        onClose={() => setObjectInfoOpen(false)}
      />
    )} */}
  </div>
);

export default DisplayCard;

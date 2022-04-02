import React from 'react';
import { Box, Button } from '@mui/material';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';
import './DisplaySquare.css';
import SquareDisplay from '../helpers/displays/square.display';

interface DisplaySquareProps {
  preview: boolean,
  slots: SquareDisplay,
  onClick: (slot: string) => void,
}

const DisplaySquare = ({
  preview, slots, onClick,
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
            {slots.icon && <TabletopIcon icon={slots.icon as TabletopIconType} />}
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
          <Button type="button" className="click-left" onClick={() => onClick('decrement')} />
          <Button type="button" className="click-right" onClick={() => onClick('increment')} />
        </>
      )}
    </Box>
  </div>
);

export default DisplaySquare;

import React from 'react';
import { Box } from '@mui/material';
import './DisplayToggle.css';
import ToggleDisplay from '../helpers/displays/toggle.display';

interface DisplayToggleProps {
  preview: boolean,
  slots: ToggleDisplay,
  onClick: (slot: string) => void,
}

const DisplayToggle = ({
  preview, slots, onClick,
}: DisplayToggleProps) => (
  <div className={`display-toggle ${preview ? 'preview' : ''}`}>
    <Box
      className="dot"
      sx={{
        border: 1,
        borderColor: 'custom.dot.border',
        backgroundColor: slots.toggle ? 'custom.dot.background' : 'none',
      }}
      onClick={() => onClick('toggle')}
    />

    <div
      className="title"
      onClick={() => onClick('action')}
    >
      {slots.name}
    </div>
  </div>
);

export default DisplayToggle;

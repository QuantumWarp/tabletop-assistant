import { Box } from '@mui/material';
import React from 'react';
import DotsDisplay from '../helpers/displays/dots.display';
import './DisplayDots.css';

interface DisplayDotsProps {
  preview: boolean,
  slots: DotsDisplay,
  onClick: (slot: string) => void,
}

const DisplayDots = ({
  preview, slots, onClick,
}: DisplayDotsProps) => (
  <div className={`display-dots ${preview ? 'preview' : ''}`}>
    <span className="name">{slots.name}</span>

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
        onClick={() => onClick('adjust')}
      />
    ))}
  </div>
);

export default DisplayDots;

import React from 'react';
import { Box } from '@mui/material';
import './ActionNode.css';

interface ActionNodeOutputProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionNodeOutput = ({
  children, onClick,
}: ActionNodeOutputProps) => (
  <Box
    className="action-node-output"
    sx={{
      borderColor: 'custom.action.border',
      backgroundColor: 'custom.action.background',
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

ActionNodeOutput.defaultProps = {
  onClick: () => {},
};

export default ActionNodeOutput;

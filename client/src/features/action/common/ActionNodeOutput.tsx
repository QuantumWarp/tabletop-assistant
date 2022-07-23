import React from 'react';
import { Box } from '@mui/material';
import './ActionNode.css';

interface ActionNodeOutputProps {
  children?: React.ReactNode;
  noOutput?: Boolean;
  onClick?: () => void;
}

const ActionNodeOutput = ({
  children, noOutput, onClick,
}: ActionNodeOutputProps) => (
  <>
    {noOutput && <Box className="action-node-output-spacer" />}

    {!noOutput && (
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
    )}
  </>
);

ActionNodeOutput.defaultProps = {
  children: null,
  onClick: () => {},
  noOutput: false,
};

export default ActionNodeOutput;

import React from 'react';
import { Box, Button } from '@mui/material';
import {
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import './ActionNode.css';

interface ActionNodeCenterProps {
  children?: React.ReactNode;
  noOutput?: boolean;
  onClick?: () => void;
}

const ActionNodeCenter = ({
  children, noOutput, onClick,
}: ActionNodeCenterProps) => (
  <Box className="action-node-center">
    {!noOutput && (
      <Button
        className="button"
        onClick={onClick}
      >
        {children}
        {!noOutput && <ArrowRightIcon />}
      </Button>
    )}
  </Box>
);

ActionNodeCenter.defaultProps = {
  children: null,
  onClick: () => {},
  noOutput: false,
};

export default ActionNodeCenter;

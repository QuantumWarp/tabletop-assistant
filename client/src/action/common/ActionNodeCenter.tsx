import React from 'react';
import { Box, Button } from '@mui/material';
import {
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import './ActionNode.css';

interface ActionNodeCenterProps {
  children: React.ReactNode;
  noOutput?: Boolean;
  onClick?: () => void;
}

const ActionNodeCenter = ({
  children, noOutput, onClick,
}: ActionNodeCenterProps) => (
  <Box className="action-node-center">
    <Button
      className="button"
      onClick={onClick}
    >
      {children}
      {!noOutput && <ArrowRightIcon />}
    </Button>
  </Box>
);

ActionNodeCenter.defaultProps = {
  onClick: () => {},
  noOutput: false,
};

export default ActionNodeCenter;

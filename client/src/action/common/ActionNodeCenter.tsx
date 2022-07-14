import React from 'react';
import { Box, Button } from '@mui/material';
import {
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import './ActionNode.css';

interface ActionNodeCenterProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionNodeCenter = ({
  children, onClick,
}: ActionNodeCenterProps) => (
  <Box className="action-node-center">
    <Button
      className="button"
      onClick={onClick}
    >
      {children}
      <ArrowRightIcon />
    </Button>
  </Box>
);

ActionNodeCenter.defaultProps = {
  onClick: () => {},
};

export default ActionNodeCenter;

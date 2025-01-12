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

export function ActionNodeCenter({
  children = null, noOutput = false, onClick = () => {},
}: ActionNodeCenterProps) {
  return (
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
};

import { Box } from '@mui/material';
import { ValueMap } from '@tabletop-assistant/common';

interface ActionNodeMacroOutputProps {
  runCount: number;
  lastResults?: ValueMap[];
}

export function ActionNodeMacroOutput ({
  runCount, lastResults,
}: ActionNodeMacroOutputProps) {
  return (
    <Box>
      {lastResults && 'Run'}
      Run
      {runCount}
    </Box>
  )
};

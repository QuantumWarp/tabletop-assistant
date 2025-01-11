import { Box } from '@mui/material';
import { Mapping } from '../../../models/mapping';
import './ActionNodeMacro.css';

interface ActionNodeMacroOutputProps {
  runCount: number;
  lastResults?: Mapping[];
}

const ActionNodeMacroOutput = ({
  runCount, lastResults,
}: ActionNodeMacroOutputProps) => (
  <Box>
    {lastResults && 'Run'}
    Run
    {runCount}
  </Box>
);

export default ActionNodeMacroOutput;

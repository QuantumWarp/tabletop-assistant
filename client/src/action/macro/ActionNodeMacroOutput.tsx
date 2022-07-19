import { Box } from '@mui/material';
import React from 'react';
import { ResolvedMacro } from '../../models/resolved-macro';
import './ActionNodeMacro.css';

interface ActionNodeMacroOutputProps {
  runCount: number;
  lastResults?: ResolvedMacro[];
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

ActionNodeMacroOutput.defaultProps = {
  lastResults: undefined,
};

export default ActionNodeMacroOutput;

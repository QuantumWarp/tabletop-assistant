import { Box } from '@mui/material';
import React from 'react';
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

ActionNodeMacroOutput.defaultProps = {
  lastResults: undefined,
};

export default ActionNodeMacroOutput;

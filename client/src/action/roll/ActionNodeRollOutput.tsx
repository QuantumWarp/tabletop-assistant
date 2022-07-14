import React from 'react';
import { Box, Divider } from '@mui/material';
import { RollResult } from 'tabletop-assistant-common';
import './ActionNodeRoll.css';
import RollHelper from '../../helpers/roll.helper';

interface ActionNodeRollOutputProps {
  results: RollResult[];
  onResultClick: (result: RollResult) => void;
}

const ActionNodeRollOutput = ({
  results, onResultClick,
}: ActionNodeRollOutputProps) => (
  <Box
    className="action-roll-output"
    sx={{
      borderColor: 'custom.action.border',
      backgroundColor: 'custom.action.background',
    }}
  >
    {[...results].reverse().map((res) => {
      const { min, max } = RollHelper.hasMinMax(res);

      return (
        <>
          <div
            className={`result${min ? ' min' : ''}${max ? ' max' : ''}`}
            onClick={() => onResultClick(res)}
          >
            {RollHelper.totalValue(res)}
          </div>

          <Divider orientation="vertical" />
        </>
      );
    })}
  </Box>
);

export default ActionNodeRollOutput;

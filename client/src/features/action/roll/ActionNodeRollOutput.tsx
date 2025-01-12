import { Box, Divider } from '@mui/material';
import { RollResult } from '@tabletop-assistant/common';
import { RollHelper } from '../../../helpers/roll.helper';
import './ActionNodeRoll.css';

interface ActionNodeRollOutputProps {
  results: RollResult[];
  onResultClick: (result: RollResult) => void;
}

export function ActionNodeRollOutput ({
  results, onResultClick,
}: ActionNodeRollOutputProps) {
  return (
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
};

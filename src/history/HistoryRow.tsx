import React, { CSSProperties } from 'react';
import RollResult from '../models/dice/roll-result';

const classes: { [key: string]: CSSProperties } = {
  historyNode: {

  },
};

interface HistoryRowProps {
  node: RollResult,
}

const HistoryRow = ({ node }: HistoryRowProps) => (
  <div style={classes.historyNode}>
    Roll
    {' '}
    {node.value}
  </div>
);

export default HistoryRow;

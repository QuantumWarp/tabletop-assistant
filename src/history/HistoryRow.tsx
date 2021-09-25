import React, { CSSProperties } from 'react';
import HistoryNode from '../models/history-node';

const classes: { [key: string]: CSSProperties } = {
  historyNode: {

  },
};

interface HistoryRowProps {
  node: HistoryNode,
}

const HistoryRow = ({ node }: HistoryRowProps) => (
  <div style={classes.historyNode}>
    {node}
  </div>
);

export default HistoryRow;

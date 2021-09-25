import React, { CSSProperties } from 'react';
import { selectHistory } from '../store/main-slice';
import { useAppSelector } from '../store/store';
import HistoryRow from './HistoryRow';

const classes: { [key: string]: CSSProperties } = {
  historyView: {

  },
};

const HistoryView = () => {
  const nodes = useAppSelector(selectHistory);

  return (
    <div style={classes.historyView}>
      {nodes.map((x) => (
        <HistoryRow node={x} />
      ))}
    </div>
  );
};

export default HistoryView;

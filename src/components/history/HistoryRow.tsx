import React from 'react';
import HistoryEntry from '../../models/history/history-entry';

interface HistoryRowProps {
  entry: HistoryEntry,
}

const HistoryRow = ({ entry }: HistoryRowProps) => (
  <div>
    {entry.date.toTimeString()}
    {entry.name}
  </div>
);

export default HistoryRow;

import React from 'react';
import HistoryEntry from '../../models/history/history-entry';

interface HistoryRowProps {
  entry: HistoryEntry,
}

const HistoryRow = ({ entry }: HistoryRowProps) => (
  <div>
    {entry.date}
    {entry.name}
  </div>
);

export default HistoryRow;

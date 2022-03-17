import TimeAgo from 'react-timeago';
import React, { useState } from 'react';
import { HistoryEntry } from 'tabletop-assistant-common';
import HistoryUpsertDialog from './HistoryUpsertDialog';
import './HistoryRow.css';
import HistoryCard from './HistoryCard';

interface HistoryRowProps {
  entry: HistoryEntry,
}

const HistoryRow = ({ entry }: HistoryRowProps) => {
  const [editHistory, setEditHistory] = useState<HistoryEntry | undefined>();

  return (
    <div className="history-row">
      <div className="date">
        <TimeAgo
          date={entry.createdAt}
          minPeriod={60}
        />
      </div>

      <HistoryCard entry={entry} />

      <div className="right-pad" />

      {editHistory && (
        <HistoryUpsertDialog
          initial={editHistory}
          open={Boolean(editHistory)}
          onClose={() => setEditHistory(undefined)}
        />
      )}
    </div>
  );
};

export default HistoryRow;

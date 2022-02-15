import TimeAgo from 'react-timeago';
import React, { useState } from 'react';
import HistoryEntry, { HistoryEntryHelper } from '../../models/history/history-entry';
import HistoryEntryCustom from '../../models/history/history-entry-custom';
import HistoryUpdateDialog from './HistoryUpdateDialog';
import './HistoryRow.css';
import HistoryCardCustom from './HistoryCardCustom';
import HistoryCardAction from './HistoryCardAction';
import HistoryCardRollResult from './HistoryCardRollResult';

interface HistoryRowProps {
  entry: HistoryEntry,
}

const HistoryRow = ({ entry }: HistoryRowProps) => {
  const [editHistory, setEditHistory] = useState<HistoryEntryCustom | null>(null);

  return (
    <div className="history-row">
      <div className="date">
        <TimeAgo
          date={entry.date}
          minPeriod={60}
        />
      </div>

      {HistoryEntryHelper.isAction(entry) && (
        <HistoryCardAction entry={entry} />
      )}

      {HistoryEntryHelper.isCustom(entry) && (
        <HistoryCardCustom entry={entry} />
      )}

      {HistoryEntryHelper.isRollResult(entry) && (
        <HistoryCardRollResult entry={entry} />
      )}

      <div className="right-pad" />

      {editHistory && (
        <HistoryUpdateDialog
          entry={editHistory}
          open={Boolean(editHistory)}
          onClose={() => setEditHistory(null)}
        />
      )}
    </div>
  );
};

export default HistoryRow;

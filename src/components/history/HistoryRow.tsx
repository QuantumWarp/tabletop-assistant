import {
  Card, CardActionArea, CardContent, Typography,
} from '@mui/material';
import TimeAgo from 'react-timeago';
import React, { useState } from 'react';
import HistoryEntry, { HistoryEntryHelper } from '../../models/history/history-entry';
import HistoryEntryCustom from '../../models/history/history-entry-custom';
import HistoryUpdateDialog from './HistoryUpdateDialog';
import './HistoryRow.css';

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

      <Card className="entry">
        <CardActionArea onClick={() => HistoryEntryHelper.isCustom(entry) && setEditHistory(entry)}>
          <CardContent>
            {HistoryEntryHelper.isAction(entry) && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  Action-
                  {entry.actionId}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Object-
                  {entry.objectId}
                </Typography>
              </>
            )}

            {HistoryEntryHelper.isCustom(entry) && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  {entry.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {entry.text}
                </Typography>
              </>
            )}

            {HistoryEntryHelper.isRollResult(entry) && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  Roll Result
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  TODO
                </Typography>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

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

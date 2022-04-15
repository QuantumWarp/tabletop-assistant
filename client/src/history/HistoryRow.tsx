import TimeAgo from 'react-timeago';
import React, { useState } from 'react';
import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { HistoryEntry } from 'tabletop-assistant-common';
import HistoryUpsertDialog from './HistoryUpsertDialog';
import './HistoryRow.css';

interface HistoryRowProps {
  entry: HistoryEntry,
}

const HistoryRow = ({ entry }: HistoryRowProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const [editHistory, setEditHistory] = useState<HistoryEntry | undefined>();

  return (
    <div className="history-row">
      <div className="date">
        <TimeAgo
          date={entry.createdAt}
          minPeriod={60}
        />
      </div>

      <Card className="history-card">
        <CardActionArea onClick={() => setEditHistory(entry)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid className="icon" item xs={1}>
                <TextSnippet />
              </Grid>

              <Grid item xs={11}>
                <Typography gutterBottom variant="h5" component="div">
                  {entry.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {entry.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>

      <div className="right-pad" />

      {editHistory && (
        <HistoryUpsertDialog
          initial={editHistory}
          tabletopId={tabletopId}
          open={Boolean(editHistory)}
          onClose={() => setEditHistory(undefined)}
        />
      )}
    </div>
  );
};

export default HistoryRow;

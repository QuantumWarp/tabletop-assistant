import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import React, { useState } from 'react';
import HistoryEntryCustom from '../models/history/history-entry-custom';
import HistoryUpdateDialog from './HistoryUpdateDialog';
import './HistoryRow.css';

interface HistoryCardCustomProps {
  entry: HistoryEntryCustom,
}

const HistoryCardCustom = ({ entry }: HistoryCardCustomProps) => {
  const [editHistory, setEditHistory] = useState<HistoryEntryCustom | null>(null);

  return (
    <>
      <Card className="history-card">
        <CardActionArea onClick={() => setEditHistory(entry)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid className="icon" item xs={1}>
                <TextSnippet />
              </Grid>

              <Grid item xs={11}>
                <Typography gutterBottom variant="h5" component="div">
                  {entry.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {entry.text}
                </Typography>
              </Grid>
            </Grid>
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
    </>
  );
};

export default HistoryCardCustom;

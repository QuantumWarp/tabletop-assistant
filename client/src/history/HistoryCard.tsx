import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import { HistoryEntry } from 'tabletop-assistant-common';
import React, { useState } from 'react';
import HistoryUpdateDialog from './HistoryUpsertDialog';

interface HistoryCardProps {
  entry: HistoryEntry,
}

const HistoryCard = ({ entry }: HistoryCardProps) => {
  const [editHistory, setEditHistory] = useState<HistoryEntry | undefined>();

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
                  {entry.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {entry.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>

      {editHistory && (
        <HistoryUpdateDialog
          initial={editHistory}
          open={Boolean(editHistory)}
          onClose={() => setEditHistory(undefined)}
        />
      )}
    </>
  );
};

export default HistoryCard;

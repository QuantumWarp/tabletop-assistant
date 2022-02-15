import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { PlayCircle } from '@mui/icons-material';
import './HistoryRow.css';
import HistoryEntryAction from '../../models/history/history-entry-action';
import { useAppSelector } from '../../store/store';
import { selectActions, selectObjects } from '../../store/config-slice';

interface HistoryCardActionProps {
  entry: HistoryEntryAction,
}

const HistoryCardAction = ({ entry }: HistoryCardActionProps) => {
  const objects = useAppSelector(selectObjects);
  const actions = useAppSelector(selectActions);

  const obj = objects.find((x) => x.id === entry.objectId);
  const action = actions.find((x) => x.id === entry.actionId);

  return (
    <Card className="history-card">
      <CardActionArea>
        <CardContent>
          <Grid container spacing={2}>
            <Grid className="icon" item xs={1}>
              <PlayCircle />
            </Grid>

            <Grid item xs={11}>
              <Typography variant="h5" component="div">
                {`${obj?.fields.title || obj?.name} (${action?.name})`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HistoryCardAction;

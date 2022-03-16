import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@mui/material';
import { Casino } from '@mui/icons-material';
import React from 'react';
import './HistoryRow.css';
import HistoryEntryRollResult from '../models/history/history-entry-roll-result';
import { RollComboHelper } from '../models/rolling/roll-combo';

interface HistoryCardRollResultProps {
  entry: HistoryEntryRollResult,
}

const HistoryCardRollResult = ({ entry }: HistoryCardRollResultProps) => (
  <Card className="history-card">
    <CardActionArea>
      <CardContent>
        <Grid container spacing={2}>
          <Grid className="icon" item xs={1}>
            <Casino />
          </Grid>

          <Grid item xs={11}>
            <Typography variant="h5" component="div">
              {RollComboHelper.totalValue(entry.rollResult)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default HistoryCardRollResult;

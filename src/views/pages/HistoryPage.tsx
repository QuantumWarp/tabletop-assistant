import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { selectHistory } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import HistoryRow from '../../components/history/HistoryRow';
import TopBar from '../../components/common/TopBar';
import './HistoryPage.css';
import HistoryUpdateDialog from '../../components/history/HistoryUpdateDialog';

const HistoryPage = () => {
  const nodes = useAppSelector(selectHistory);
  const [newHistoryDialogOpen, setNewHistoryDialogOpen] = useState(false);

  return (
    <div className="history-page">
      <TopBar title="History">
        <div className="history-controls">
          <TextField
            label="Search"
            variant="standard"
          />

          <Button
            variant="outlined"
            onClick={() => setNewHistoryDialogOpen(true)}
          >
            New Entry
          </Button>
        </div>
      </TopBar>

      <div className="history-content">
        {nodes.map((x) => (
          <HistoryRow
            key={x.id}
            entry={x}
          />
        ))}
      </div>

      <HistoryUpdateDialog
        open={newHistoryDialogOpen}
        onClose={() => setNewHistoryDialogOpen(false)}
      />
    </div>
  );
};

export default HistoryPage;

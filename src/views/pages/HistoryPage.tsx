import React from 'react';
import { Button, TextField } from '@mui/material';
import { selectHistory } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import HistoryRow from '../../components/history/HistoryRow';
import TopBar from '../../components/common/TopBar';
import './HistoryPage.css';

const HistoryPage = () => {
  const nodes = useAppSelector(selectHistory);

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
          >
            New Entry
          </Button>
        </div>
      </TopBar>

      <div className="history-content">
        {nodes.map((x) => (
          <HistoryRow entry={x} />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

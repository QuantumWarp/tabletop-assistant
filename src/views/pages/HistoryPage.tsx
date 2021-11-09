import React, { useState } from 'react';
import {
  Button, TextField, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import { Casino, PlayCircle, TextSnippet } from '@mui/icons-material';
import { selectHistory } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';
import HistoryRow from '../../components/history/HistoryRow';
import TopBar from '../../components/common/TopBar';
import './HistoryPage.css';
import HistoryUpdateDialog from '../../components/history/HistoryUpdateDialog';
import { HistoryEntryHelper } from '../../models/history/history-entry';

const HistoryPage = () => {
  const nodes = useAppSelector(selectHistory);
  const [newHistoryDialogOpen, setNewHistoryDialogOpen] = useState(false);
  const [filters, setFilters] = useState(['custom']);

  const filteredNodes = nodes.filter((x) => (HistoryEntryHelper.isCustom(x) && filters.includes('custom'))
    || (HistoryEntryHelper.isAction(x) && filters.includes('action'))
    || (HistoryEntryHelper.isRollResult(x) && filters.includes('roll')));

  return (
    <div className="history-page">
      <TopBar title="History">
        <div className="history-controls">
          <TextField
            label="Search"
            variant="standard"
          />

          <ToggleButtonGroup
            value={filters}
            onChange={(_e, newFilters) => setFilters(newFilters)}
          >
            <ToggleButton value="custom">
              <TextSnippet />
            </ToggleButton>
            <ToggleButton value="action">
              <PlayCircle />
            </ToggleButton>
            <ToggleButton value="roll">
              <Casino />
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="outlined"
            onClick={() => setNewHistoryDialogOpen(true)}
          >
            New Entry
          </Button>
        </div>
      </TopBar>

      <div className="history-content">
        <div className="inner">
          {filteredNodes.map((x) => (
            <HistoryRow
              key={x.id}
              entry={x}
            />
          ))}
        </div>
      </div>

      <HistoryUpdateDialog
        open={newHistoryDialogOpen}
        onClose={() => setNewHistoryDialogOpen(false)}
      />
    </div>
  );
};

export default HistoryPage;

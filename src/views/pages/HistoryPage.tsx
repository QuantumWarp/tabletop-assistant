import React, { useState } from 'react';
import {
  Button, IconButton, TextField, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import {
  Casino, Delete, PlayCircle, TextSnippet,
} from '@mui/icons-material';
import { deleteHistory, selectHistory } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import HistoryRow from '../../components/history/HistoryRow';
import TopBar from '../../components/common/TopBar';
import './HistoryPage.css';
import HistoryUpdateDialog from '../../components/history/HistoryUpdateDialog';
import { HistoryEntryHelper } from '../../models/history/history-entry';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';

const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectHistory);
  const [newHistoryDialogOpen, setNewHistoryDialogOpen] = useState(false);
  const [deleteShownOpen, setDeleteShownOpen] = useState(false);
  const [filters, setFilters] = useState(['custom']);
  const [filter, setFilter] = useState('');

  const filteredNodes = nodes.filter((x) => (HistoryEntryHelper.isCustom(x) && filters.includes('custom'))
    || (HistoryEntryHelper.isAction(x) && filters.includes('action'))
    || (HistoryEntryHelper.isRollResult(x) && filters.includes('roll')));

  const searchedNodes = filteredNodes.filter((x) => !filter
    || (HistoryEntryHelper.isCustom(x)
    && x.title.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div className="history-page">
      <TopBar title="History">
        <div className="history-controls">
          <TextField
            label="Search"
            variant="standard"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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

          <IconButton
            title="Delete"
            color="error"
            onClick={() => setDeleteShownOpen(true)}
          >
            <Delete />
          </IconButton>

          {deleteShownOpen && (
            <DeleteConfirmDialog
              objType="History"
              objName="ALL currently displayed history!"
              open={deleteShownOpen}
              onDelete={() => {
                dispatch(deleteHistory(searchedNodes.map((x) => x.id)));
                setDeleteShownOpen(false);
              }}
              onClose={() => setDeleteShownOpen(false)}
            />
          )}

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
          {searchedNodes.map((x) => (
            <HistoryRow
              key={x.id}
              entry={x}
            />
          ))}
        </div>
      </div>

      {newHistoryDialogOpen && (
        <HistoryUpdateDialog
          open={newHistoryDialogOpen}
          onClose={() => setNewHistoryDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default HistoryPage;

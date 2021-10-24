import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { deleteHistory, upsertHistory } from '../../store/configuration-slice';
import HistoryEntryCustom from '../../models/history/history-entry-custom';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface HistoryUpdateDialogProps {
  entry?: Partial<HistoryEntryCustom>;
  open: boolean;
  onClose: (entry?: HistoryEntryCustom) => void;
}

const HistoryUpdateDialog = ({ entry = {}, open, onClose }: HistoryUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [title, setTitle] = useState(entry.title || '');
  const [text, setText] = useState(entry.text || '');

  const saveHistory = () => {
    const updatedHistory = {
      id: entry?.id || guid(),
      date: entry?.date || Date.now(),
      title,
      text,
    };
    dispatch(upsertHistory(updatedHistory));
    onClose(updatedHistory);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {entry.id ? 'Update ' : 'Create '}
        History Entry
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Detail"
          variant="standard"
          multiline
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        {entry.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="History Entry"
              objName={entry.title}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteHistory(entry.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveHistory} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

HistoryUpdateDialog.defaultProps = {
  entry: {},
};

export default HistoryUpdateDialog;
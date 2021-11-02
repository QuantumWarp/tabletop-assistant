import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import TopBar from '../../components/common/TopBar';
import NoteList from '../../components/notes/NoteList';
import NoteUpdateDialog from '../../components/notes/NoteUpdateDialog';
import { selectNotes } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';
import './NotesPage.css';

const NotesPage = () => {
  const notes = useAppSelector(selectNotes);
  const [filter, setFilter] = useState('');
  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);

  return (
    <div className="notes-page">
      <TopBar title="Notes">
        <div className="notes-controls">
          <TextField
            label="Search"
            variant="standard"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={() => setNewNoteDialogOpen(true)}
          >
            New Note
          </Button>
        </div>

        <NoteUpdateDialog
          open={newNoteDialogOpen}
          onClose={() => setNewNoteDialogOpen(false)}
        />
      </TopBar>

      <div className="notes-content">
        <NoteList
          notes={notes}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default NotesPage;

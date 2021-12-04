import {
  Box, Button, Container, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import TopBar from '../../components/common/TopBar';
import NoteList from '../../components/notes/NoteList';
import NoteUpdateDialog from '../../components/notes/NoteUpdateDialog';
import { selectNotes } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';

const NotesPage = () => {
  const notes = useAppSelector(selectNotes);
  const [filter, setFilter] = useState('');
  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);

  return (
    <>
      <TopBar title="Notes">
        <TextField
          sx={{ minWidth: 400 }}
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

        {newNoteDialogOpen && (
          <NoteUpdateDialog
            open={newNoteDialogOpen}
            onClose={() => setNewNoteDialogOpen(false)}
          />
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <NoteList
            notes={notes}
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default NotesPage;

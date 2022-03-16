import {
  Box, Button, Container, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import TopBar from '../components/common/TopBar';
import NoteList from './NoteList';
import NoteUpdateDialog from './NoteUpdateDialog';

const NotePage = () => {
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
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default NotePage;

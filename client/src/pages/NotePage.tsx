import {
  Box, Button, Container, TextField,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NoteList from '../features/note/NoteList';
import NoteUpsertDialog from '../features/note/NoteUpsertDialog';

const NotePage = () => {
  const { tabletopId } = useParams() as { tabletopId: string };
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
          <NoteUpsertDialog
            tabletopId={tabletopId}
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

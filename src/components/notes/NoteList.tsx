import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Note from '../../models/notes/note';
import NoteCard from './NoteCard';
import NoteUpdateDialog from './NoteUpdateDialog';

interface NotesListProps {
  notes: Note[];
  filter: string;
}

const NoteList = ({ notes, filter }: NotesListProps) => {
  const filteredNotes = notes.filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()));
  const [editNote, setEditNote] = useState<Note | null>(null);

  return (
    <Grid container spacing={6}>
      {filteredNotes.map((note) => (
        <Grid key={note.id} item xs={4}>
          <NoteCard
            note={note}
            onClick={() => setEditNote(note)}
          />
        </Grid>
      ))}

      {editNote && (
        <NoteUpdateDialog
          note={editNote}
          open={Boolean(editNote)}
          onClose={() => setEditNote(null)}
        />
      )}
    </Grid>
  );
};

export default NoteList;

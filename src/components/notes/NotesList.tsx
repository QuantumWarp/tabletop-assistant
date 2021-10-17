import React from 'react';
import { Grid } from '@mui/material';
import Note from '../../models/notes/note';
import NoteCard from './NoteCard';

interface NotesListProps {
  notes: Note[];
  filter: string;
}

const NotesList = ({ notes, filter }: NotesListProps) => {
  const filteredNotes = notes.filter((x) => x.title.includes(filter));

  return (
    <Grid container spacing={2}>
      {filteredNotes.map((note) => (
        <Grid item xs={4}>
          <NoteCard note={note} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NotesList;

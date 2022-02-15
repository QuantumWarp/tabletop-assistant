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
  const [editNote, setEditNote] = useState<Note | null>(null);

  const filteredNotes = notes.filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()));
  const sortedNotes = filteredNotes.sort((a, b) => {
    const aImageSign = a.image ? -1 : 1;
    const imageSort = Boolean(a.image) === Boolean(b.image) ? 0 : aImageSign;
    if (imageSort !== 0) return imageSort;
    return a.title.localeCompare(b.title);
  });

  return (
    <Grid container spacing={6}>
      {sortedNotes.map((note) => (
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

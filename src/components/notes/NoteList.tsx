import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import { Button, Grid } from '@mui/material';
import Note from '../../models/notes/note';
import NoteCard from './NoteCard';
import NoteUpdateDialog from './NoteUpdateDialog';
import { useAppDispatch } from '../../store/store';
import { upsertNote } from '../../store/configuration-slice';

interface NotesListProps {
  notes: Note[];
  filter: string;
}

const NoteList = ({ notes, filter }: NotesListProps) => {
  const dispatch = useAppDispatch();
  const filteredNotes = notes.filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()));
  const [editNote, setEditNote] = useState<Note | null>(null);

  return (
    <Grid container spacing={2}>
      <Button
        onClick={() => setEditNote({
          id: guid(),
          title: '',
          text: '',
        })}
      >
        New Note
      </Button>

      {filteredNotes.map((note) => (
        <Grid item xs={4}>
          <NoteCard
            note={note}
            onClick={() => setEditNote(note)}
          />
        </Grid>
      ))}

      {editNote && (
        <NoteUpdateDialog
          currentNote={editNote}
          open={Boolean(editNote)}
          onUpdate={(note) => dispatch(upsertNote(note))}
          onClose={() => setEditNote(null)}
        />
      )}
    </Grid>
  );
};

export default NoteList;

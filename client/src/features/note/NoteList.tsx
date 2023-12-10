import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Note } from '@/common';
import { useParams } from 'react-router-dom';
import NoteCard from './NoteCard';
import NoteUpsertDialog from './NoteUpsertDialog';
import { useGetNotesQuery } from '../../store/api';

interface NotesListProps {
  filter: string;
}

const NoteList = ({ filter }: NotesListProps) => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const [editNote, setEditNote] = useState<Note | undefined>();
  const { data: notes } = useGetNotesQuery(tabletopId);

  const filteredNotes = notes
    ? notes.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedNotes = filteredNotes.sort((a, b) => {
    const aImageSign = a.imageUrl ? -1 : 1;
    const imageSort = Boolean(a.imageUrl) === Boolean(b.imageUrl) ? 0 : aImageSign;
    if (imageSort !== 0) return imageSort;
    return a.name.localeCompare(b.name);
  });

  return (
    <Grid container spacing={6}>
      {sortedNotes.map((note) => (
        <Grid key={note._id} item xs={4}>
          <NoteCard
            note={note}
            onClick={() => setEditNote(note)}
          />
        </Grid>
      ))}

      {editNote && (
        <NoteUpsertDialog
          initial={editNote}
          tabletopId={tabletopId}
          open={Boolean(editNote)}
          onClose={() => setEditNote(undefined)}
        />
      )}
    </Grid>
  );
};

export default NoteList;

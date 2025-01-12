import { useState } from 'react';
import { Grid2 } from '@mui/material';
import { Note } from '@tabletop-assistant/common';
import { useParams } from 'react-router-dom';
import { NoteCard } from './NoteCard';
import { NoteUpsertDialog } from './NoteUpsertDialog';
import { useGetNotesQuery } from '../../store/api';

interface NotesListProps {
  filter: string;
}

export function NoteList({ filter }: NotesListProps) {
  const { tabletopId } = useParams() as { tabletopId: string };
  const [editNote, setEditNote] = useState<Note | undefined>();
  const { data: notes } = useGetNotesQuery(tabletopId);

  const filteredNotes = notes
    ? notes.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedNotes = filteredNotes.sort((a, b) => {
    const aImageSign = a.imageId ? -1 : 1;
    const imageSort = Boolean(a.imageId) === Boolean(b.imageId) ? 0 : aImageSign;
    if (imageSort !== 0) return imageSort;
    return a.name.localeCompare(b.name);
  });

  return (
    <Grid2 container spacing={6}>
      {sortedNotes.map((note) => (
        <Grid2 key={note.id} size={4}>
          <NoteCard
            note={note}
            onClick={() => setEditNote(note)}
          />
        </Grid2>
      ))}

      {editNote && (
        <NoteUpsertDialog
          initial={editNote}
          tabletopId={tabletopId}
          open={Boolean(editNote)}
          onClose={() => setEditNote(undefined)}
        />
      )}
    </Grid2>
  );
};

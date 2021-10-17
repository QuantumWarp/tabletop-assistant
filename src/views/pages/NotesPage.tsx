import { TextField } from '@mui/material';
import React, { useState } from 'react';
import NoteList from '../../components/notes/NoteList';
import { selectNotes } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import './NotesPage.css';

const NotesPage = () => {
  const notes = useAppSelector(selectNotes);
  const [filter, setFilter] = useState('');

  return (
    <div className="notes-page">
      <TextField
        label="Search"
        variant="filled"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <NoteList
        notes={notes}
        filter={filter}
      />
    </div>
  );
};

export default NotesPage;

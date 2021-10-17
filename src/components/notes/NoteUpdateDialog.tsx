import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Note from '../../models/notes/note';

interface NoteUpdateDialogProps {
  currentNote: Note;
  open: boolean;
  onUpdate: (note: Note) => void;
  onClose: () => void;
}

const NoteUpdateDialog = ({
  currentNote, open, onUpdate, onClose,
}: NoteUpdateDialogProps) => {
  const [note, setNote] = useState(currentNote);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Note</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          variant="standard"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <TextField
          label="Subtitle"
          variant="standard"
          value={note.subtitle}
          onChange={(e) => setNote({ ...note, subtitle: e.target.value })}
        />

        <TextField
          label="Image URL"
          variant="standard"
          value={note.img}
          onChange={(e) => setNote({ ...note, img: e.target.value })}
        />

        <TextField
          label="Detail"
          variant="standard"
          multiline
          value={note.text}
          onChange={(e) => setNote({ ...note, text: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate(note); onClose(); }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteUpdateDialog;

import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Note from '../../models/notes/note';
import { useAppDispatch } from '../../store/store';
import { upsertNote } from '../../store/configuration-slice';

interface NoteUpdateDialogProps {
  note?: Partial<Note>;
  open: boolean;
  onClose: (note?: Note) => void;
}

const NoteUpdateDialog = ({ note = {}, open, onClose }: NoteUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(note.title || '');
  const [subtitle, setSubtitle] = useState(note.subtitle || '');
  const [image, setImage] = useState(note.image || '');
  const [text, setText] = useState(note.text || '');

  const saveNote = () => {
    const updatedNote = {
      id: note?.id || guid(),
      title,
      subtitle,
      image,
      text,
    };
    dispatch(upsertNote(updatedNote));
    onClose(updatedNote);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Note</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Subtitle"
          variant="standard"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <TextField
          label="Image URL"
          variant="standard"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextField
          label="Detail"
          variant="standard"
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>

        <Button onClick={saveNote} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NoteUpdateDialog.defaultProps = {
  note: {},
};

export default NoteUpdateDialog;

import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import Note from '../../models/notes/note';
import { useAppDispatch } from '../../store/store';
import { deleteNote, upsertNote } from '../../store/config-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface NoteUpdateDialogProps {
  note?: Partial<Note>;
  open: boolean;
  onClose: (note?: Note) => void;
}

const NoteUpdateDialog = ({ note = {}, open, onClose }: NoteUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

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
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {note.id ? 'Update ' : 'Create '}
          Note
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Image URL</InputLabel>
              <OutlinedInput
                fullWidth
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      title="Open in new tab"
                      onClick={() => window.open(image, '_blank')}
                      edge="end"
                    >
                      <OpenInNew />
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detail"
              multiline
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {note.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Note"
              objName={note.title}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteNote(note.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveNote} variant="outlined">
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

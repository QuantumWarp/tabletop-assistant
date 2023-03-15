import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Note } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../store/api';
import ImageInput from '../../components/form-controls/ImageInput';

interface NoteUpsertDialogProps {
  initial?: Note;
  tabletopId: string;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const NoteUpsertDialog = ({
  initial, tabletopId, open, onClose,
}: NoteUpsertDialogProps) => {
  const [createNote, {
    isLoading: creating,
    isSuccess: createSuccess,
    isError: createError,
  }] = useCreateNoteMutation();

  const [updateNote, {
    isLoading: updating,
    isSuccess: updateSuccess,
    isError: updateError,
  }] = useUpdateNoteMutation();

  const [deleteNote, {
    isLoading: deleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteNoteMutation();

  const loading = creating || updating || deleting;
  const success = createSuccess || updateSuccess || deleteSuccess;
  const error = createError || updateError || deleteError;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(initial?.name || '');
  const [subtitle, setSubtitle] = useState(initial?.subtitle || '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || '');
  const [description, setDescription] = useState(initial?.description || '');

  useEffect(() => {
    if (success) onClose(deleteSuccess);
  }, [success, deleteSuccess, onClose]);

  const saveNote = () => {
    const updatedProps = {
      name,
      subtitle,
      imageUrl,
      description,
    };

    if (initial?._id !== undefined) {
      updateNote({ ...initial, ...updatedProps });
    } else {
      createNote({ tabletopId, ...updatedProps });
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>
          {initial?._id ? 'Update ' : 'Create '}
          Note
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Name"
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subtitle"
              disabled={loading}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <ImageInput
              disabled={loading}
              value={imageUrl}
              onChange={(value) => setImageUrl(value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              disabled={loading}
              rows={12}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">An error occured</Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?._id && (
          <>
            <Button
              variant="outlined"
              color="error"
              disabled={loading}
              endIcon={deleting ? <CircularProgress size="20px" /> : <DeleteIcon />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Note"
              objName={initial.name}
              open={deleteOpen}
              onDelete={() => { deleteNote(initial._id); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button
          variant="outlined"
          disabled={loading}
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          disabled={loading}
          endIcon={(creating || updating) ? <CircularProgress size="20px" /> : <SaveIcon />}
          onClick={saveNote}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NoteUpsertDialog.defaultProps = {
  initial: undefined,
};

export default NoteUpsertDialog;

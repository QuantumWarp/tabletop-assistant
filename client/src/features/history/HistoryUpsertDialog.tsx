import { useEffect, useState } from 'react';
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
import { HistoryEntry } from '@tabletop-assistant/common';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';
import { useCreateHistoryEntryMutation, useDeleteHistoryEntryMutation, useUpdateHistoryEntryMutation } from '../../store/api';

interface HistoryUpsertDialogProps {
  initial?: HistoryEntry;
  tabletopId: string;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const HistoryUpsertDialog = ({
  initial, tabletopId, open, onClose,
}: HistoryUpsertDialogProps) => {
  const [createHistoryEntry, {
    isLoading: creating,
    isSuccess: createSuccess,
    isError: createError,
  }] = useCreateHistoryEntryMutation();

  const [updateHistoryEntry, {
    isLoading: updating,
    isSuccess: updateSuccess,
    isError: updateError,
  }] = useUpdateHistoryEntryMutation();

  const [deleteHistoryEntry, {
    isLoading: deleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteHistoryEntryMutation();

  const loading = creating || updating || deleting;
  const success = createSuccess || updateSuccess || deleteSuccess;
  const error = createError || updateError || deleteError;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');

  useEffect(() => {
    if (success) onClose(deleteSuccess);
  }, [success, deleteSuccess, onClose]);

  const saveHistoryEntry = () => {
    const updatedProps = {
      name,
      description,
    };

    if (initial?.id !== undefined) {
      updateHistoryEntry({ ...initial, ...updatedProps });
    } else {
      createHistoryEntry({ tabletopId, ...updatedProps });
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>
          {initial?.id ? 'Update ' : 'Create '}
          History
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
              label="Description"
              multiline
              disabled={loading}
              rows={10}
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
        {initial?.id && (
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
              objType="History Entry"
              objName={initial.name}
              open={deleteOpen}
              onDelete={() => { deleteHistoryEntry(initial.id); }}
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
          onClick={saveHistoryEntry}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

HistoryUpsertDialog.defaultProps = {
  initial: undefined,
};

export default HistoryUpsertDialog;

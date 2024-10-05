import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Tabletop } from '@tabletop-assistant/common';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';
import {
  useCreateTabletopMutation,
  useDeleteTabletopMutation,
  useUpdateTabletopMutation,
} from '../../store/api';
import ImageInput from '../../components/form-controls/ImageInput';

interface TabletopUpdateDialogProps {
  initial?: Tabletop;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const TabletopUpdateDialog = ({
  initial, open, onClose,
}: TabletopUpdateDialogProps) => {
  const [createTabletop, {
    isLoading: creating,
    isSuccess: createSuccess,
    isError: createError,
  }] = useCreateTabletopMutation();

  const [updateTabletop, {
    isLoading: updating,
    isSuccess: updateSuccess,
    isError: updateError,
  }] = useUpdateTabletopMutation();

  const [deleteTabletop, {
    isLoading: deleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteTabletopMutation();

  const loading = creating || updating || deleting;
  const success = createSuccess || updateSuccess || deleteSuccess;
  const error = createError || updateError || deleteError;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(initial?.name || '');
  const [shortName, setShortName] = useState(initial?.shortName || '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || '');
  const [description, setDescription] = useState(initial?.description || '');

  useEffect(() => {
    if (success) onClose(deleteSuccess);
  }, [success, deleteSuccess, onClose]);

  const saveTabletop = () => {
    const updatedProps = {
      name,
      shortName,
      imageUrl,
      description,
    };

    if (initial?._id !== undefined) {
      updateTabletop({ ...initial, ...updatedProps });
    } else {
      createTabletop(updatedProps);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <b>
          {initial?._id ? 'Update ' : 'Create '}
          Tabletop
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Short Name"
              disabled={loading}
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
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
              objType="Config"
              objName={initial.shortName}
              open={deleteOpen}
              onDelete={() => { deleteTabletop(initial._id); }}
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
          onClick={saveTabletop}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TabletopUpdateDialog.defaultProps = {
  initial: undefined,
};

export default TabletopUpdateDialog;

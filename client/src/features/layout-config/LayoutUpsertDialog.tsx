import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Layout } from '@/common';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';
import { useCreateLayoutMutation, useDeleteLayoutMutation, useUpdateLayoutMutation } from '../../store/api';

interface LayoutUpsertDialogProps {
  initial?: Layout;
  tabletopId: string;
  nextOrder?: number;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const LayoutUpsertDialog = ({
  initial, tabletopId, nextOrder = 0, open, onClose,
}: LayoutUpsertDialogProps) => {
  const [createLayout, {
    isLoading: creating,
    isSuccess: createSuccess,
    isError: createError,
  }] = useCreateLayoutMutation();

  const [updateLayout, {
    isLoading: updating,
    isSuccess: updateSuccess,
    isError: updateError,
  }] = useUpdateLayoutMutation();

  const [deleteLayout, {
    isLoading: deleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteLayoutMutation();

  const loading = creating || updating || deleting;
  const success = createSuccess || updateSuccess || deleteSuccess;
  const error = createError || updateError || deleteError;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(initial?.name || '');

  useEffect(() => {
    if (success) onClose(deleteSuccess);
  }, [success, deleteSuccess, onClose]);

  const saveLayout = () => {
    const updatedProps = {
      name,
    };

    if (initial?._id !== undefined) {
      updateLayout({ ...initial, ...updatedProps });
    } else {
      createLayout({
        tabletopId,
        hidden: false,
        order: nextOrder,
        ...updatedProps,
        entries: [],
      });
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?._id ? 'Update ' : 'Create '}
          Layout
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              disabled={loading}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(initial, null, 2));
                onClose();
              }}
            >
              Export
            </Button>

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
              objType="Layout"
              objName={initial.name}
              open={deleteOpen}
              onDelete={() => { deleteLayout(initial._id); }}
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
          onClick={saveLayout}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LayoutUpsertDialog.defaultProps = {
  initial: undefined,
  nextOrder: 0,
};

export default LayoutUpsertDialog;

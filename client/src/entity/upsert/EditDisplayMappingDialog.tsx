import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';

interface EditDisplayDialogProps {
  initial?: Partial<{ key: string, value: string }>;
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (display: { key: string, value: string }) => void;
}

const EditDisplayDialog = ({
  initial, open, onClose, onSave,
}: EditDisplayDialogProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [key, setKey] = useState(initial?.key || '');
  const [value, setValue] = useState(initial?.value || '');

  const saveField = () => {
    const updatedProps = {
      key,
      value,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.key ? 'Update ' : 'Create '}
          Display
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Slot</InputLabel>
              <Select
                label="Slot"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              >
                <MenuItem value="Example">Example</MenuItem>
                <MenuItem value="Another">Another</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Field</InputLabel>
              <Select
                label="Field"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <MenuItem value="Example">Example</MenuItem>
                <MenuItem value="Another">Another</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.key && (
          <>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Note"
              objName={initial.key}
              open={deleteOpen}
              onDelete={() => onClose(true)}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => saveField()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDisplayDialog.defaultProps = {
  initial: {},
};

export default EditDisplayDialog;

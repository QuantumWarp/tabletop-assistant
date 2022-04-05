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
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { EntityField } from 'tabletop-assistant-common';
import FieldHelper from '../../helpers/field.helper';

interface EditFieldDialogProps {
  initial?: Partial<EntityField>;
  open: boolean;
  onSave: (field: EntityField) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditFieldDialog = ({
  initial, open, onSave, onDelete, onClose,
}: EditFieldDialogProps) => {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || '');
  const [initialValue, setInitialValue] = useState(initial?.initial || '');

  const key = FieldHelper.createKey(name);

  const saveField = () => {
    const updatedProps = {
      name,
      key,
      type,
      initial: initialValue,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.key ? 'Update ' : 'Create '}
          Field
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {FieldHelper.list().map((x) => (
                  <MenuItem key={x} value={x}>
                    {FieldHelper.displayName(x)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Initial Value"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.key && (
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => { onDelete(); onClose(); }}
          >
            Delete
          </Button>
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

EditFieldDialog.defaultProps = {
  initial: {},
};

export default EditFieldDialog;

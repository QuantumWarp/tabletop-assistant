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
import { EntityField } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import DisplayType, { DisplayTypeHelper } from '../../display/types/display-type';

interface EditDisplayDialogProps {
  initial?: Partial<{ key: string, value: string }>;
  type: DisplayType;
  fields: EntityField[];
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (display: { key: string, value: string }) => void;
}

const EditDisplayDialog = ({
  initial, type, fields, open, onClose, onSave,
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
          Mapping
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
                {DisplayTypeHelper.slots(type).map((x) => (
                  <MenuItem
                    key={x.key}
                    value={x.key}
                  >
                    {x.name}
                  </MenuItem>
                ))}
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
                {fields.map((x) => (
                  <MenuItem
                    key={x.key}
                    value={x.key}
                  >
                    {x.name}
                  </MenuItem>
                ))}
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

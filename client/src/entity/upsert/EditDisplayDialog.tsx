import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { EntityDisplay } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import EditDisplayMappingDialog from './EditDisplayMappingDialog';

interface EditDisplayDialogProps {
  initial?: Partial<EntityDisplay>;
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (display: EntityDisplay) => void;
}

const EditDisplayDialog = ({
  initial, open, onClose, onSave,
}: EditDisplayDialogProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editMapping, setEditMapping] = useState<Partial<{ key: string, value: string }>>();

  const [type, setType] = useState(initial?.type || '');
  const [defaultVal, setDefault] = useState(initial?.default || false);
  const [mappings, setMappings] = useState(initial?.mappings || {});

  const saveField = () => {
    const updatedProps = {
      type,
      default: defaultVal,
      mappings,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.type ? 'Update ' : 'Create '}
          Display
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Example">Example</MenuItem>
                <MenuItem value="Another">Another</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              label="Default"
              control={(
                <Checkbox
                  checked={defaultVal}
                  onChange={(e) => setDefault(e.target.checked)}
                />
              )}
            />
          </Grid>

          {Object.entries(mappings).map((mapping) => (
            <ListItem
              dense
              // eslint-disable-next-line react/no-array-index-key
              key={mapping[0]}
            >
              <ListItemButton
                onClick={() => setEditMapping({ key: mapping[0], value: mapping[1] })}
              >
                <ListItemText primary={`${mapping[0]} - ${mapping[1]}`} />
              </ListItemButton>
            </ListItem>
          ))}

          <Button
            variant="outlined"
            onClick={() => setEditMapping({})}
          >
            Add Mapping
          </Button>

          {editMapping && (
            <EditDisplayMappingDialog
              initial={editMapping}
              open={Boolean(editMapping)}
              onClose={() => setEditMapping(undefined)}
              onSave={(mapping) => setMappings({ ...mappings, [mapping.key]: mapping.value })}
            />
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.type && (
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
              objName={initial.type}
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

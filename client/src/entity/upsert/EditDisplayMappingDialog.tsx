import React, { useEffect, useState } from 'react';
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
import { CreateEntity } from 'tabletop-assistant-common';
import DisplayType from '../../helpers/display.type';
import DisplayHelper from '../../helpers/display.helper';
import FieldHelper from '../../helpers/field.helper';

interface EditDisplayDialogProps {
  initial?: Partial<{ key: string, value: string }>;
  entity: CreateEntity;
  usedSlotKeys: string[];
  type: DisplayType;
  open: boolean;
  onSave: (display: { key: string, value: string }) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditDisplayDialog = ({
  initial, entity, usedSlotKeys, type, open, onClose, onDelete, onSave,
}: EditDisplayDialogProps) => {
  const [key, setKey] = useState(initial?.key || '');
  const [value, setValue] = useState(initial?.value || '');

  const availableSlots = DisplayHelper.slots(type)
    .filter((x) => initial?.key === x.key
      || (!usedSlotKeys.includes(x.key)
        && (!x.inverse || !usedSlotKeys.includes(x.inverse))))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const selectedSlot = availableSlots.find((x) => x.key === key);

  const validFields = FieldHelper.getFields(entity)
    .filter((x) => x.type === selectedSlot?.type);

  const saveField = () => {
    const updatedProps = {
      key,
      value,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  useEffect(() => {
    if (!initial?.key) setValue('');
  }, [initial?.key, key]);

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
                disabled={Boolean(initial?.key)}
                value={key}
                onChange={(e) => setKey(e.target.value)}
              >
                {availableSlots.map((x) => (
                  <MenuItem key={x.key} value={x.key}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedSlot?.type !== 'action' && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Field</InputLabel>
                <Select
                  label="Field"
                  disabled={!selectedSlot}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  {validFields.map((x) => (
                    <MenuItem key={x.key} value={x.key}>
                      {x.name}
                    </MenuItem>
                  ))}
                  {validFields.length === 0 && (
                    <MenuItem disabled>
                      No valid fields
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}

          {selectedSlot?.type === 'action' && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Action</InputLabel>
                <Select
                  label="Action"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  {entity.actions.map((x) => (
                    <MenuItem key={x.key} value={x.key}>
                      {x.name}
                    </MenuItem>
                  ))}
                  {entity.actions.length === 0 && (
                    <MenuItem disabled>
                      No actions
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
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

EditDisplayDialog.defaultProps = {
  initial: {},
};

export default EditDisplayDialog;

import { useEffect, useState } from 'react';
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
import { CreateEntity, EntityDisplayType, SlotFieldMapping } from '@tabletop-assistant/common';
import DisplayHelper from '../../../helpers/display.helper';
import FieldHelper from '../../../helpers/field.helper';

interface EditDisplayDialogProps {
  initial?: Partial<SlotFieldMapping>;
  entity: CreateEntity;
  usedSlotKeys: string[];
  type: EntityDisplayType;
  open: boolean;
  onSave: (display: SlotFieldMapping) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditDisplayDialog = ({
  initial, entity, usedSlotKeys, type, open, onClose, onDelete, onSave,
}: EditDisplayDialogProps) => {
  const [slotKey, setSlotKey] = useState(initial?.slotKey || '');
  const [fieldKey, setFieldKey] = useState(initial?.fieldKey || '');

  const availableSlots = DisplayHelper.slots(type)
    .filter((x) => initial?.slotKey === x.key
      || (!usedSlotKeys.includes(x.key)
        && (!x.inverse || !usedSlotKeys.includes(x.inverse))))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const selectedSlot = availableSlots.find((x) => x.key === slotKey);

  const validFields = FieldHelper.getFields(entity)
    .filter((x) => x.type === selectedSlot?.type);

  const saveField = () => {
    const updatedProps = {
      slotKey,
      fieldKey,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  useEffect(() => {
    if (!initial?.slotKey) setFieldKey('');
  }, [initial?.slotKey, slotKey]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.slotKey ? 'Update ' : 'Create '}
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
                disabled={Boolean(initial?.slotKey)}
                value={slotKey}
                onChange={(e) => setSlotKey(e.target.value)}
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
                  value={fieldKey}
                  onChange={(e) => setFieldKey(e.target.value)}
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
                  value={fieldKey}
                  onChange={(e) => setFieldKey(e.target.value)}
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
        {initial?.slotKey && (
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

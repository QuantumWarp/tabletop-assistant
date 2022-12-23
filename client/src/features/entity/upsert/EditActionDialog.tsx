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
import {
  CreateEntity, EntityAction,
} from 'tabletop-assistant-common';
import FieldHelper from '../../../helpers/field.helper';
import RollInput from '../../../components/form-controls/RollInput';
import TriggerInput from '../../../components/form-controls/TriggerInput';
import MacroInput from '../../../components/form-controls/MacroInput';

interface EditActionDialogProps {
  initial?: Partial<EntityAction>;
  entity: CreateEntity,
  open: boolean;
  onSave: (field: EntityAction) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditActionDialog = ({
  initial, entity, open, onSave, onDelete, onClose,
}: EditActionDialogProps) => {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState((initial?.roll && 'roll') || (initial?.macros && 'macros') || 'info');
  const [roll, setRoll] = useState(initial?.roll);
  const [macros, setMacros] = useState(initial?.macros);
  const [triggers, setTriggers] = useState(initial?.triggers || []);

  const key = FieldHelper.createKey(name);

  const saveField = () => {
    const updatedProps = {
      name,
      key,
      roll,
      triggers,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.key ? 'Update ' : 'Create '}
          Action
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
                <MenuItem value="info">Information</MenuItem>
                <MenuItem value="roll">Roll</MenuItem>
                <MenuItem value="macro">Macro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {type === 'roll' && (
            <Grid item xs={12}>
              <RollInput
                value={roll || []}
                onChange={(newRoll) => setRoll(newRoll)}
              />
            </Grid>
          )}

          {type === 'macro' && (
            <Grid item xs={12}>
              <MacroInput
                value={macros || []}
                onChange={(newMacros) => setMacros(newMacros)}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TriggerInput
              value={triggers}
              entity={entity}
              onChange={(x) => setTriggers(x)}
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
            onClick={() => onDelete()}
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

EditActionDialog.defaultProps = {
  initial: {},
};

export default EditActionDialog;

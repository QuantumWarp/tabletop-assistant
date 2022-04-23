import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { CreateEntity, EntityAction, EntityActionTrigger } from 'tabletop-assistant-common';
import EditActionTriggerDialog from './EditActionTriggerDialog';
import FieldHelper from '../../helpers/field.helper';

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
  const [editTrigger, setEditTrigger] = useState<Partial<EntityActionTrigger>>();

  const [name, setName] = useState(initial?.name || '');
  const [roll, setRoll] = useState(initial?.roll || '');
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
            <TextField
              fullWidth
              label="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </Grid>

          {triggers.length > 0 && (
            <Grid item xs={12}>
              <Divider />

              {triggers.map((trigger, index) => (
                <ListItem
                  dense
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <ListItemButton onClick={() => setEditTrigger(trigger)}>
                    <ListItemText primary={trigger.manual ? 'Manual' : 'Triggered'} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Grid>
          )}

          <Grid item container xs={12} justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => setEditTrigger({})}
            >
              Add Trigger
            </Button>
          </Grid>

          {editTrigger && (
            <EditActionTriggerDialog
              initial={editTrigger}
              entity={entity}
              open={Boolean(editTrigger)}
              onClose={() => setEditTrigger(undefined)}
              onSave={(trigger) => setTriggers(triggers.concat([trigger]))}
            />
          )}
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

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { EntityAction, EntityActionTrigger } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import EditActionTriggerDialog from './EditActionTriggerDialog';

interface EditActionDialogProps {
  initial?: Partial<EntityAction>;
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (action: EntityAction) => void;
}

const EditActionDialog = ({
  initial, open, onClose, onSave,
}: EditActionDialogProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editTrigger, setEditTrigger] = useState<Partial<EntityActionTrigger>>();

  const [name, setName] = useState(initial?.name || '');
  const key = name.replace(' ', ''); // TODO
  const [roll, setRoll] = useState(initial?.roll || '');
  const [triggers, setTriggers] = useState(initial?.triggers || []);

  const saveField = () => {
    const updatedProps = {
      name,
      key,
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

          {triggers.map((trigger, index) => (
            <ListItem
              dense
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <ListItemButton onClick={() => setEditTrigger(trigger)}>
                <ListItemText primary={trigger.manual} />
              </ListItemButton>
            </ListItem>
          ))}

          <Button
            variant="outlined"
            onClick={() => setEditTrigger({})}
          >
            Add Trigger
          </Button>

          {editTrigger && (
            <EditActionTriggerDialog
              initial={editTrigger}
              open={Boolean(editTrigger)}
              onClose={() => setEditTrigger(undefined)}
              onSave={(trigger) => setTriggers(triggers.concat([trigger]))}
            />
          )}
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
              objName={initial.name}
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

EditActionDialog.defaultProps = {
  initial: {},
};

export default EditActionDialog;

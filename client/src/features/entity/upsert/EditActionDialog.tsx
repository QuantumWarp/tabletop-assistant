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
import { useParams } from 'react-router-dom';
import EditActionTriggerDialog from './EditActionTriggerDialog';
import FieldHelper from '../../../helpers/field.helper';
import { useGetEntitiesQuery } from '../../../store/api';
import ActionTreeHelper from '../../../helpers/action-tree.helper';

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
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const [editTrigger, setEditTrigger] = useState<Partial<EntityActionTrigger>>();

  const [name, setName] = useState(initial?.name || '');
  const [roll] = useState(initial?.roll);
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
            {/* <TextField
              fullWidth
              label="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            /> */}
          </Grid>

          {triggers.length > 0 && (
            <Grid item xs={12}>
              <Divider />

              {triggers.map((trigger) => {
                const text = ActionTreeHelper.getTriggerString(
                  trigger, entity, entities,
                );

                return (
                  <ListItem
                    dense
                    key={text}
                  >
                    <ListItemButton onClick={() => setEditTrigger(trigger)}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
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
              onSave={(trigger) => setTriggers(
                triggers.filter((x) => x !== editTrigger)
                  .concat([trigger])
                  .sort((a, b) => -ActionTreeHelper.triggerCompare(a, b)),
              )}
              onDelete={() => setTriggers(triggers.filter((x) => x !== editTrigger))}
              onClose={() => setEditTrigger(undefined)}
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

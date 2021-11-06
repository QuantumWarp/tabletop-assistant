import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import GameAction from '../../models/objects/game-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  deleteAction, selectActions, selectObjects, upsertAction,
} from '../../store/config-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';
import ActionTrigger from '../../models/objects/action-trigger';
import ActionTriggerUpdateDialog from './ActionTriggerUpdateDialog';
import './ActionUpdateDialog.css';

interface ActionUpdateDialogProps {
  action?: Partial<GameAction>;
  open: boolean;
  onClose: (action?: GameAction) => void;
}

const ActionUpdateDialog = ({ action = {}, open, onClose }: ActionUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const actions = useAppSelector(selectActions);
  const objects = useAppSelector(selectObjects);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editTrigger, setEditTrigger] = useState<ActionTrigger | undefined>();

  const [name, setName] = useState(action.name || '');
  const [icon, setIcon] = useState(action.icon || '');
  const [roll, setRoll] = useState(action.roll || '');
  const [objectId, setObjectId] = useState(action.objectId || '');
  const [triggers, setTriggers] = useState(action.triggers || []);

  const saveAction = () => {
    const updatedAction = {
      id: action?.id || guid(),
      name,
      icon: icon as TabletopIconType,
      roll,
      objectId,
      triggers,
    };
    dispatch(upsertAction(updatedAction));
    onClose(updatedAction);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        <b>
          {action.id ? 'Update ' : 'Create '}
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
              <InputLabel>Attached to Object</InputLabel>
              <Select
                fullWidth
                value={objectId}
                label="Attached to Object *"
                onChange={(e) => setObjectId(e.target.value)}
              >
                {objects.map((x) => (
                  <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Icon</InputLabel>
              <Select
                fullWidth
                label="Icon"
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                {Object.values(TabletopIconType).map((x) => (
                  <MenuItem
                    key={x}
                    value={x}
                  >
                    <div className="icon-menu-item">
                      <TabletopIcon icon={x as TabletopIconType} />
                      <span>{x}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Typography variant="h6">
              <span style={{ marginRight: '20px' }}>Triggers</span>
              <Button onClick={() => setEditTrigger({})} variant="outlined">
                Add
              </Button>
            </Typography>
          </Grid>

          {editTrigger && (
            <ActionTriggerUpdateDialog
              open={Boolean(editTrigger)}
              trigger={editTrigger}
              onDelete={() => setTriggers(triggers.filter((x) => x !== editTrigger))}
              onClose={(updated) => {
                const index = triggers.indexOf(editTrigger);
                setEditTrigger(undefined);
                if (!updated) return;
                const array = [...triggers];
                if (index === -1) array.push(updated);
                else array[index] = updated;
                setTriggers(array);
              }}
            />
          )}

          {triggers.map((trigger) => {
            const triggerAction = actions.find((x) => x.id === trigger.actionId);
            const triggerObject = objects.find((x) => x.id === triggerAction?.objectId);
            const manualText = trigger.manual ? 'Manual' : '';
            const siblingText = trigger.sibling ? 'Sibling - ' : '';
            const actionText = triggerAction ? triggerAction.name : '';
            const objectText = triggerObject ? ` (${triggerObject.name})` : '';
            const text = manualText + siblingText + actionText + objectText;

            return (
              <ListItem
                dense
                key={trigger.manual ? 'manual' : trigger.actionId}
                className="trigger-row"
              >
                <ListItemButton onClick={() => setEditTrigger(trigger)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions>
        {action.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Action"
              objName={action.name}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteAction(action.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveAction} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ActionUpdateDialog.defaultProps = {
  action: {},
};

export default ActionUpdateDialog;

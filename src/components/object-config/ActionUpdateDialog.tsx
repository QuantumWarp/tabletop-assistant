import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GameAction from '../../models/objects/game-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  deleteAction, selectActions, selectGameObjects, upsertAction,
} from '../../store/configuration-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';
import ActionTrigger from '../../models/objects/action-trigger';
import ActionTriggerUpdateDialog from './ActionTriggerUpdateDialog';

interface ActionUpdateDialogProps {
  action?: Partial<GameAction>;
  open: boolean;
  onClose: (action?: GameAction) => void;
}

const ActionUpdateDialog = ({ action = {}, open, onClose }: ActionUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const gameActions = useAppSelector(selectActions);
  const gameObjects = useAppSelector(selectGameObjects);

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
        {action.id ? 'Update ' : 'Create '}
        Action
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          fullWidth
          variant="standard"
          value={objectId}
          label="Attach to Object"
          onChange={(e) => setObjectId(e.target.value)}
        >
          {gameObjects.map((x) => (
            <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
          ))}
        </Select>

        <Select
          fullWidth
          label="Icon"
          variant="standard"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          {Object.values(TabletopIconType).map((x) => (
            <MenuItem
              key={x}
              value={x}
            >
              <TabletopIcon icon={x as TabletopIconType} />
              {x}
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="Roll"
          variant="standard"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        Triggers

        <Button onClick={() => setEditTrigger({})}>
          Add
        </Button>

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
          const triggerAction = gameActions.find((x) => x.id === trigger.actionId);
          const triggerObj = gameObjects.find((x) => x.id === triggerAction?.objectId);
          const text = `${triggerAction?.name} (${triggerObj?.name})
${trigger.manual ? ' - Manual' : ''}
${trigger.sibling ? ' - Sibling' : ''}`;

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

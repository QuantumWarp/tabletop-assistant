import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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

  const [name, setName] = useState(action.name || '');
  const [icon, setIcon] = useState(action.icon || '');
  const [roll, setRoll] = useState(action.roll || '');
  const [objectId, setObjectId] = useState(action.objectId || '');

  const saveAction = () => {
    const updatedAction = {
      id: action?.id || guid(),
      name,
      icon: icon as TabletopIconType,
      objectId,
      triggers: action?.triggers || [],
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
            <MenuItem value={x.id}>{x.name}</MenuItem>
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
            <MenuItem value={x}>
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

        {action.triggers?.map(() => (
          <div className="trigger-row">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Manual" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Sibling" />
            <Select
              fullWidth
              label="Action"
              variant="standard"
            >
              {gameActions.map((act) => {
                const obj = gameObjects.find((x) => x.id === act.objectId);
                return (
                  <MenuItem value={act.id}>
                    {obj?.name}
                    {' - '}
                    {act.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        ))}
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

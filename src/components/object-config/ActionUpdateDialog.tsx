import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GameAction from '../../models/objects/game-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteAction, selectGameObjects, upsertAction } from '../../store/configuration-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface ActionUpdateDialogProps {
  action?: Partial<GameAction>;
  open: boolean;
  onClose: (action?: GameAction) => void;
}

const ActionUpdateDialog = ({ action = {}, open, onClose }: ActionUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const gameObjects = useAppSelector(selectGameObjects);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(action.name || '');
  const [objectId, setObjectId] = useState(action.objectId || '');

  const saveAction = () => {
    const updatedAction = {
      id: action?.id || guid(),
      name,
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

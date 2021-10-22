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
import { selectGameObjects, upsertAction } from '../../store/configuration-slice';

interface ActionUpdateDialogProps {
  action?: Partial<GameAction>;
  open: boolean;
  onClose: (action?: GameAction) => void;
}

const ActionUpdateDialog = ({ action = {}, open, onClose }: ActionUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const gameObjects = useAppSelector(selectGameObjects);

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
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>

        <Button onClick={saveAction} color="primary">
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

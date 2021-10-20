import React, { useState } from 'react';
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
import { useAppSelector } from '../../store/store';
import { selectGameObjects } from '../../store/configuration-slice';

interface ActionUpdateDialogProps {
  currentAction: GameAction;
  open: boolean;
  onUpdate: (action: GameAction) => void;
  onClose: () => void;
}

const ActionUpdateDialog = ({
  currentAction, open, onUpdate, onClose,
}: ActionUpdateDialogProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const [action, setAction] = useState(currentAction);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Action</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          value={action.name}
          onChange={(e) => setAction({ ...action, name: e.target.value })}
        />

        <Select
          fullWidth
          variant="standard"
          value={action.objectId}
          label="Attach to Object"
          onChange={(e) => setAction({ ...action, objectId: e.target.value })}
        >
          {gameObjects.map((x) => (
            <MenuItem value={x.id}>{x.name}</MenuItem>
          ))}
        </Select>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate(action); onClose(); }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionUpdateDialog;

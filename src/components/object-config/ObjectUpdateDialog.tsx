import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import GameObject from '../../models/objects/game-object';

interface ObjectUpdateDialogProps {
  currentObject: GameObject;
  open: boolean;
  onUpdate: (gameObject: GameObject) => void;
  onClose: () => void;
}

const ObjectUpdateDialog = ({
  currentObject, open, onUpdate, onClose,
}: ObjectUpdateDialogProps) => {
  const [gameObject, setGameObject] = useState(currentObject);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Object</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          variant="standard"
          value={gameObject.name}
          onChange={(e) => setGameObject({ ...gameObject, name: e.target.value })}
        />

        <TextField
          label="Description"
          variant="standard"
          multiline
          value={gameObject.description}
          onChange={(e) => setGameObject({ ...gameObject, description: e.target.value })}
        />

        <TextField
          label="Value"
          variant="standard"
          value={gameObject.value}
          onChange={(e) => setGameObject({ ...gameObject, value: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate(gameObject); onClose(); }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ObjectUpdateDialog;

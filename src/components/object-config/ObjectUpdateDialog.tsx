import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import GameObject from '../../models/objects/game-object';
import { useAppDispatch } from '../../store/store';
import { upsertObject } from '../../store/configuration-slice';

interface ObjectUpdateDialogProps {
  gameObject?: Partial<GameObject>;
  open: boolean;
  onClose: (gameObject?: GameObject) => void;
}

const ObjectUpdateDialog = ({ gameObject = {}, open, onClose }: ObjectUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(gameObject.name || '');
  const [value, setValue] = useState(gameObject.value || '');
  const [description, setDescription] = useState(gameObject.description || '');

  const saveObject = () => {
    const updatedObject = {
      id: gameObject?.id || guid(),
      name,
      value,
      description,
    };
    dispatch(upsertObject(updatedObject));
    onClose(updatedObject);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Object</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Value"
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <TextField
          fullWidth
          label="Description"
          variant="standard"
          multiline
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>

        <Button onClick={saveObject} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ObjectUpdateDialog.defaultProps = {
  gameObject: {},
};

export default ObjectUpdateDialog;

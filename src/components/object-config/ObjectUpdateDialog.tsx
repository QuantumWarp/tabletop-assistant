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
import { deleteObject, upsertObject } from '../../store/configuration-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface ObjectUpdateDialogProps {
  gameObject?: Partial<GameObject>;
  open: boolean;
  onClose: (gameObject?: GameObject) => void;
}

const ObjectUpdateDialog = ({ gameObject = {}, open, onClose }: ObjectUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

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
        {gameObject.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Object"
              objName={gameObject.name}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteObject(gameObject.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveObject} variant="outlined">
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

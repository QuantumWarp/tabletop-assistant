import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from '@mui/material';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import { selectGameObjects } from '../store/configuration-slice';
import { useAppSelector } from '../store/store';
import './LayoutBox.css';

interface LayoutBoxDialogProps {
  open: boolean,
  entry: LayoutEntry,
  onUpdate: (entry: LayoutEntry) => void,
  onClose: () => void,
}

const LayoutBoxDialog = ({
  open, entry, onUpdate, onClose,
}: LayoutBoxDialogProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  const [gameObjKey, setGameObjKey] = useState(entry.key);
  const [display, setDisplay] = useState(entry.display);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Box</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Update
        </DialogContentText>

        <Select
          value={gameObjKey}
          onChange={(e) => setGameObjKey(e.target.value as string)}
        >
          {gameObjects.map((obj) => (
            <MenuItem value={obj.key}>{obj.name}</MenuItem>
          ))}
        </Select>

        <Select
          value={display}
          onChange={(e) => setDisplay(e.target.value as DisplayType)}
        >
          <MenuItem value={DisplayType.default}>Default</MenuItem>
          <MenuItem value={DisplayType.dotCounter}>Dot Counter</MenuItem>
        </Select>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate({ ...entry, key: gameObjKey, display }); onClose(); }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LayoutBoxDialog;

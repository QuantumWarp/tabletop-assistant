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
import DisplayType from '../../models/layout/display-type';
import LayoutEntry from '../../models/layout/layout-entry';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';

interface LayoutConfigDialogProps {
  open: boolean,
  entry: LayoutEntry,
  onUpdate: (entry: LayoutEntry) => void,
  onClose: () => void,
}

const LayoutConfigDialog = ({
  open, entry, onUpdate, onClose,
}: LayoutConfigDialogProps) => {
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
            <MenuItem
              key={obj.id}
              value={obj.id}
            >
              {obj.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={display}
          onChange={(e) => setDisplay(e.target.value as DisplayType)}
        >
          <MenuItem value={DisplayType.simpleCard}>{DisplayType.simpleCard}</MenuItem>
          <MenuItem value={DisplayType.simpleToggle}>{DisplayType.simpleToggle}</MenuItem>
          <MenuItem value={DisplayType.numberSquare}>{DisplayType.numberSquare}</MenuItem>
          <MenuItem value={DisplayType.dotCounter}>{DisplayType.dotCounter}</MenuItem>
        </Select>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate({ ...entry, key: gameObjKey, display }); onClose(); }} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LayoutConfigDialog;

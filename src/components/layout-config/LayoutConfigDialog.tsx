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
} from '@mui/material';
import DisplayType from '../../models/layout/display-type';
import LayoutEntry from '../../models/layout/layout-entry';
import { deleteEntry, selectObjects, upsertEntry } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { LayoutPositionHelper } from '../../models/layout/layout-position';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface LayoutConfigDialogProps {
  entry?: Partial<LayoutEntry>;
  open: boolean;
  onClose: (entry?: LayoutEntry) => void;
}

const LayoutConfigDialog = ({ entry = {}, open, onClose }: LayoutConfigDialogProps) => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(selectObjects);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [objectId, setObjectId] = useState(entry.objectId || '');
  const [display, setDisplay] = useState(entry.display || DisplayType.simpleCard);

  const saveLayoutConfig = () => {
    const updatedEntry = {
      id: entry?.id || guid(),
      objectId,
      display,
      position: entry?.position || LayoutPositionHelper.createPosition(0, 0, 20, 20),
    };
    dispatch(upsertEntry(updatedEntry));
    onClose(updatedEntry);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {entry.id ? 'Update ' : 'Create '}
        Layout Entry
      </DialogTitle>

      <DialogContent>
        <Select
          fullWidth
          variant="standard"
          value={objectId}
          label="Object"
          onChange={(e) => setObjectId(e.target.value)}
        >
          {objects.map((obj) => (
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
        {entry.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Entry"
              objName="entry"
              open={deleteOpen}
              onDelete={() => { dispatch(deleteEntry(entry.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveLayoutConfig} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LayoutConfigDialog.defaultProps = {
  entry: {},
};

export default LayoutConfigDialog;

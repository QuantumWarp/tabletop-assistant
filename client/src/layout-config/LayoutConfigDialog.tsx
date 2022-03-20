import React, { useEffect, useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import { deleteEntry, selectObjects, upsertEntry } from '../store/config-slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { LayoutPositionHelper } from '../models/layout/layout-position';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import LayoutDisplay from '../display/LayoutDisplay';
import './LayoutConfigDialog.css';

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

  const selectedObject = objects.find((x) => x.id === objectId);

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

  useEffect(() => {
    if (!selectedObject) return;
    if (!selectedObject.defaultDisplay) return;
    setDisplay(selectedObject.defaultDisplay);
  }, [selectedObject]);

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {entry.id ? 'Update ' : 'Add '}
          Layout Entry
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Object</InputLabel>
              <Select
                fullWidth
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
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Display</InputLabel>
              <Select
                label="Display"
                value={display}
                onChange={(e) => setDisplay(e.target.value as DisplayType)}
              >
                {Object.values(DisplayType).map((x) => (
                  <MenuItem
                    key={x}
                    value={x}
                  >
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} className="layout-display-dialog-section">
            {selectedObject && (
              <LayoutDisplay
                obj={selectedObject}
                display={display}
                interactable={false}
              />
            )}
          </Grid>
        </Grid>
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

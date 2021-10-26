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
import { useAppDispatch } from '../../store/store';
import { deleteLayout, upsertLayout } from '../../store/configuration-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import LayoutTab from '../../models/layout/layout-tab';

interface LayoutConfigTabDialogProps {
  layout?: Partial<LayoutTab>;
  open: boolean;
  onClose: (layout?: LayoutTab) => void;
}

const LayoutConfigTabDialog = ({ layout = {}, open, onClose }: LayoutConfigTabDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(layout.name || '');

  const saveLayout = () => {
    const updatedLayout = {
      id: layout.id || guid(),
      name,
      entries: layout.entries || [],
    };
    dispatch(upsertLayout(updatedLayout));
    onClose(updatedLayout);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {layout.id ? 'Update ' : 'Create '}
        Note
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        {layout.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Layout"
              objName={layout.name}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteLayout(layout.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveLayout} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LayoutConfigTabDialog.defaultProps = {
  layout: {},
};

export default LayoutConfigTabDialog;
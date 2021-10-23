import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteConfirmDialogProps {
  objType: string,
  objName?: string,
  open: boolean,
  onDelete: () => void,
  onClose: (deleted: boolean) => void,
}

const DeleteConfirmDialog = ({
  objType, objName, open, onDelete, onClose,
}: DeleteConfirmDialogProps) => (
  <Dialog open={open} onClose={() => onClose(false)}>
    <DialogTitle>
      {'Delete '}
      {objType}
    </DialogTitle>

    <DialogContent>
      <DialogContentText>
        {'Are you sure you want to delete '}
        <b>{objName}</b>
        ?
      </DialogContentText>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => onClose(false)} variant="outlined">
        Cancel
      </Button>

      <Button onClick={() => { onDelete(); onClose(true); }} color="error" variant="outlined">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmDialog.defaultProps = {
  objName: '',
};

export default DeleteConfirmDialog;

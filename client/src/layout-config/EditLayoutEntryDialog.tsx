import React, { useState } from 'react';
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
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { LayoutEntry } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import './LayoutConfigDialog.css';
import { useGetEntitiesQuery } from '../store/api';
import DisplayType from '../models/layout/display-type';

interface EditLayoutEntryDialogProps {
  initial?: LayoutEntry;
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (action: LayoutEntry) => void;
}

const EditLayoutEntryDialog = ({
  initial, open, onClose, onSave,
}: EditLayoutEntryDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const display = DisplayType.dotCounter;

  const [entityId, setEntityId] = useState(initial?.entityId || '');
  const [displayType, setDisplayType] = useState<DisplayType>(
    initial?.displayType || display,
  );

  const saveEntry = () => {
    const updatedProps = {
      entityId,
      displayType,
      position: { top: 0, left: 0 },
      size: { height: 100, width: 100 },
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.entityId ? 'Update ' : 'Add '}
          Layout Entry
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Object</InputLabel>
              <Select
                label="Object"
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
              >
                {entities && entities.map((x) => (
                  <MenuItem
                    key={x._id}
                    value={x._id}
                  >
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={displayType}
                onChange={(e) => setDisplayType(e.target.value as DisplayType)}
              >
                <MenuItem value="Example">Example</MenuItem>
                <MenuItem value="Another">Another</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.entityId && (
          <>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Entry"
              objName={initial.entityId}
              open={deleteOpen}
              onDelete={() => onClose(true)}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => saveEntry()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditLayoutEntryDialog.defaultProps = {
  initial: undefined,
};

export default EditLayoutEntryDialog;

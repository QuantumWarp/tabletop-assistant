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
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import Configuration from '../../models/configuration';
import { deleteConfiguration, upsertConfiguration } from '../../store/main-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

interface ConfigUpdateDialogProps {
  config?: Partial<Configuration>;
  open: boolean;
  onClose: () => void;
}

const ConfigUpdateDialog = ({ config = {}, open, onClose }: ConfigUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(config.name || '');
  const [shortName, setShortName] = useState(config.shortName || '');
  const [image, setImage] = useState(config.image || '');
  const [description, setDescription] = useState(config.description || '');

  const saveConfig = () => {
    const updatedConfig: Configuration = {
      id: config?.id || guid(),
      name,
      shortName,
      image,
      description,
      actions: config.actions || [],
      history: config.history || [],
      layouts: config.layouts || [],
      notes: config.notes || [],
      objects: config.objects || [],
    };
    dispatch(upsertConfiguration(updatedConfig));
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {config.id ? 'Update ' : 'Create '}
        Config
      </DialogTitle>

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
          label="Short Name"
          variant="standard"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Image URL"
          variant="standard"
          value={image}
          onChange={(e) => setImage(e.target.value)}
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
        {config.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Config"
              objName={config.shortName}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteConfiguration(config.id as string)); onClose(); history.push('/'); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveConfig} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfigUpdateDialog.defaultProps = {
  config: {},
};

export default ConfigUpdateDialog;

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
import { deleteConfig, upsertConfig } from '../../store/main-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import ConfigInfo from '../../models/config-info';
import { setInfo } from '../../store/config-slice';
import { defaultConfiguration } from '../../models/configuration';
import ConfigExportDialog from '../export/ConfigExportDialog';

interface ConfigUpdateDialogProps {
  info?: Partial<ConfigInfo>;
  configId?: string;
  open: boolean;
  onClose: () => void;
}

const ConfigUpdateDialog = ({
  info = {}, configId, open, onClose,
}: ConfigUpdateDialogProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [name, setName] = useState(info.name || '');
  const [shortName, setShortName] = useState(info.shortName || '');
  const [image, setImage] = useState(info.image || '');
  const [description, setDescription] = useState(info.description || '');

  const saveConfig = () => {
    const updatedConfig: ConfigInfo = {
      name,
      shortName,
      image,
      description,
    };
    if (configId) {
      dispatch(setInfo(updatedConfig));
    } else {
      dispatch(upsertConfig({
        ...defaultConfiguration(),
        id: guid(),
        info: updatedConfig,
      }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {configId ? 'Update ' : 'Create '}
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
        {configId && (
          <>
            <Button onClick={() => setExportOpen(true)} variant="outlined">
              Export
            </Button>

            <ConfigExportDialog
              open={exportOpen}
              onClose={() => setExportOpen(false)}
            />

            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Config"
              objName={info.shortName}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteConfig(configId)); onClose(); history.push('/'); }}
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
  info: {},
  configId: undefined,
};

export default ConfigUpdateDialog;

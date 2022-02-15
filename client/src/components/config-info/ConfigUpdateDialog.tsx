import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteConfig, upsertConfig } from '../../store/main-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import ConfigInfo from '../../models/config-info';
import { loadConfig, selectConfig, setInfo } from '../../store/config-slice';
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
  const currentConfig = useAppSelector(selectConfig);
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
      dispatch(upsertConfig({
        ...currentConfig,
        info: updatedConfig,
      }));
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
    <Dialog open={open}>
      <DialogTitle>
        <b>
          {configId ? 'Update ' : 'Create '}
          Config
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Short Name"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Image URL</InputLabel>
              <OutlinedInput
                fullWidth
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      title="Open in new tab"
                      onClick={() => window.open(image, '_blank')}
                      edge="end"
                    >
                      <OpenInNew />
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={12}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
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
              onDelete={() => { dispatch(deleteConfig(configId)); dispatch(loadConfig(defaultConfiguration())); onClose(); history.push('/'); }}
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

import React, { useState } from 'react';
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
import { Config } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import ConfigExportDialog from '../export/ConfigExportDialog';
import {
  useCreateConfigMutation,
  useDeleteConfigMutation,
  useUpdateConfigMutation,
} from '../../store/api';

interface ConfigUpdateDialogProps {
  initial?: Config;
  open: boolean;
  onClose: () => void;
}

const ConfigUpdateDialog = ({
  initial, open, onClose,
}: ConfigUpdateDialogProps) => {
  const history = useHistory();

  const [createConfig] = useCreateConfigMutation();
  const [updateConfig] = useUpdateConfigMutation();
  const [deleteConfig] = useDeleteConfigMutation();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [name, setName] = useState(initial?.name || '');
  const [shortName, setShortName] = useState(initial?.shortName || '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || undefined);
  const [description, setDescription] = useState(initial?.description || undefined);

  const saveConfig = () => {
    const config = {
      ...initial,
      name,
      shortName,
      imageUrl,
      description,
    };

    if (config._id) {
      updateConfig(config);
    } else {
      createConfig(config);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <b>
          {initial?._id ? 'Update ' : 'Create '}
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      title="Open in new tab"
                      onClick={() => window.open(imageUrl, '_blank')}
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
        {initial?._id && (
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
              objName={initial.shortName}
              open={deleteOpen}
              onDelete={() => { deleteConfig(initial._id); onClose(); history.push('/'); }}
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
  initial: undefined,
};

export default ConfigUpdateDialog;

import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { useAppSelector } from '../../store/store';
import { selectConfig } from '../../store/config-slice';
import Configuration from '../../models/configuration';

interface ConfigExportDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfigExportDialog = ({ open, onClose }: ConfigExportDialogProps) => {
  const config = useAppSelector(selectConfig);

  const [exportInfo, setExportInfo] = useState(true);
  const [exportLayouts, setExportLayouts] = useState(true);
  const [exportObjects, setExportObjects] = useState(true);
  const [exportActions, setExportActions] = useState(true);
  const [exportNotes, setExportNotes] = useState(true);
  const [exportHistory, setExportHistory] = useState(true);

  const download = (name: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.json`;
    document.body.appendChild(element);
    element.click();
  };

  const exportConfig = () => {
    const downloadConfig: Partial<Configuration> = {
      id: config.id,
      info: exportInfo ? config.info : undefined,
      layouts: exportLayouts ? config.layouts : undefined,
      objects: exportObjects ? config.objects : undefined,
      actions: exportActions ? config.actions : undefined,
      notes: exportNotes ? config.notes : undefined,
      history: exportHistory ? config.history : undefined,
    };

    const text = JSON.stringify(downloadConfig, null, 2);

    download(config.info.shortName, text);
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Export</b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControlLabel
              label="Info"
              control={(
                <Checkbox
                  checked={exportInfo}
                  onChange={(e) => setExportInfo(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Layouts"
              control={(
                <Checkbox
                  checked={exportLayouts}
                  onChange={(e) => setExportLayouts(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Objects"
              control={(
                <Checkbox
                  checked={exportObjects}
                  onChange={(e) => setExportObjects(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Actions"
              control={(
                <Checkbox
                  checked={exportActions}
                  onChange={(e) => setExportActions(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Notes"
              control={(
                <Checkbox
                  checked={exportNotes}
                  onChange={(e) => setExportNotes(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="History"
              control={(
                <Checkbox
                  checked={exportHistory}
                  onChange={(e) => setExportHistory(e.target.checked)}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={exportConfig} variant="outlined">
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigExportDialog;

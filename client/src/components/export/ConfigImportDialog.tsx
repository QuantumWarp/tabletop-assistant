import React, { useRef, useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Configuration, { defaultConfiguration } from '../../models/configuration';
import { useAppDispatch } from '../../store/store';
import { upsertConfig } from '../../store/main-slice';

interface ConfigImportDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfigImportDialog = ({ open, onClose }: ConfigImportDialogProps) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const createConfiguration = (text: string) => {
    const parsedConfig: Partial<Configuration> = JSON.parse(text);
    const newConfig: Configuration = {
      ...defaultConfiguration(),
      ...parsedConfig,
      id: guid(),
    };
    dispatch(upsertConfig(newConfig));
    onClose();
  };

  const importConfig = () => {
    if (!selectedFile) return;
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = (event) => {
      const text = event.target?.result;
      if (!text) return;
      createConfiguration(text.toString());
    };
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Import</b>
      </DialogTitle>

      <DialogContent>
        <input
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
          onChange={(event) => setSelectedFile(event.target.files && event.target.files[0])}
        />

        <Button sx={{ my: 2 }} variant="outlined" onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>

        <Typography>
          {selectedFile ? selectedFile.name : 'No file selected'}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button disabled={!selectedFile} onClick={importConfig} variant="outlined">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigImportDialog;

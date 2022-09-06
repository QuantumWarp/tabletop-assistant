import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { TemplateImport } from 'tabletop-assistant-common';
import { useImportTemplateMutation } from '../../store/api';

interface TemplateImportDialogProps {
  templateImport: TemplateImport;
  open: boolean;
  onClose: () => void;
}

const TemplateImportDialog = ({
  templateImport, open, onClose,
}: TemplateImportDialogProps) => {
  const [importTemplate, {
    isLoading,
    isSuccess,
    isError,
  }] = useImportTemplateMutation();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth>
      <DialogTitle>
        <b>
          Import
          {' - '}
          {templateImport.tabletopId}
        </b>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {templateImport.tabletopId}
        </Typography>

        {isError && (
          <Alert severity="error">An error occured</Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          disabled={isLoading}
          onClick={() => onClose()}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          disabled={isLoading}
          onClick={() => importTemplate(templateImport)}
          variant="outlined"
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateImportDialog;

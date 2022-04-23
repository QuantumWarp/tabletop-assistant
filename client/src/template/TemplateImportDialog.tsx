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
import { TemplateSummary } from 'tabletop-assistant-common';
import { useImportTemplateMutation } from '../store/api';

interface TemplateImportDialogProps {
  template: TemplateSummary;
  tabletopId: string;
  open: boolean;
  onClose: () => void;
}

const TemplateImportDialog = ({
  template, tabletopId, open, onClose,
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
          {template.name}
        </b>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {template.description}
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
          onClick={() => importTemplate({
            templateId: template._id,
            tabletopId,
          })}
          variant="outlined"
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateImportDialog;

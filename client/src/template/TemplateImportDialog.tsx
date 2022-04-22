import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Template } from 'tabletop-assistant-common';

interface TemplateImportDialogProps {
  template: Template;
  open: boolean;
  onClose: () => void;
}

const TemplateImportDialog = ({
  template, open, onClose,
}: TemplateImportDialogProps) => (
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
    </DialogContent>

    <DialogActions>
      <Button onClick={() => onClose()} variant="outlined">
        Cancel
      </Button>

      <Button onClick={() => onClose()} variant="outlined">
        Import
      </Button>
    </DialogActions>
  </Dialog>
);

export default TemplateImportDialog;

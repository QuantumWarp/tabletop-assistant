import { useEffect } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { TemplateGroup, TemplateRoot } from '@tabletop-assistant/common';

interface TemplateImportDialogProps {
  tabletopId: string;
  templateRoot: TemplateRoot;
  templateGroup: TemplateGroup;
  open: boolean;
  onClose: () => void;
}

const TemplateImportDialog = ({
  tabletopId, templateRoot, templateGroup, open, onClose,
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
        <b>Import</b>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {'This template will include '}
          <b>{templateGroup.layoutIds.length}</b>
          {' Layouts and '}
          <b>{templateGroup.entityIds.length}</b>
          {' Objects.'}
        </Typography>

        <Typography pt={2}>
          <b>{templateRoot.name}</b>
        </Typography>

        <Typography>{templateRoot.description}</Typography>

        <Typography pt={2}>
          <b>{templateGroup.name}</b>
        </Typography>

        <Typography>{templateGroup.description}</Typography>

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
            tabletopId,
            layoutIds: templateGroup.layoutIds,
            entityIds: templateGroup.entityIds,
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

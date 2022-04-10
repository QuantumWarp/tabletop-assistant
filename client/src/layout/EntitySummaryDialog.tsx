import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { CreateEntity } from 'tabletop-assistant-common';

interface ObjectInfoDialogProps {
  entity: CreateEntity;
  fieldMappings: { [field: string]: string };
  open: boolean;
  onClose: () => void;
}

const ObjectInfoDialog = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  entity, fieldMappings, open, onClose,
}: ObjectInfoDialogProps) => (
  <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
    <DialogTitle>
      <b>{entity.name}</b>
    </DialogTitle>

    <DialogContent>
      <Typography sx={{ whiteSpace: 'pre-line' }}>
        {entity.description}
      </Typography>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => onClose()} variant="outlined">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ObjectInfoDialog;

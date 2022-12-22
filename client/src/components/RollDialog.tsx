import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { RollCombo } from 'tabletop-assistant-common';
import { useGetEntitiesQuery } from '../store/api';

interface RollDialogProps {
  initial: RollCombo;
  open: boolean;
  onSave: (roll: RollCombo) => void;
  onDelete: () => void;
  onClose: () => void;
}

const RollDialog = ({
  initial, open, onSave, onDelete, onClose,
}: RollDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  console.log(entities, onDelete);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          Computed Expression
        </b>
      </DialogTitle>

      <DialogContent>
        Test
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => onSave(initial)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RollDialog;

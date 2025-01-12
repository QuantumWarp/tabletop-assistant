import { useState } from 'react';
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
import { EntityField } from '@tabletop-assistant/common';
import { ValueInput } from '../../components/form-controls/ValueInput';
import { FieldType } from '../../models/field.type';

interface EntityValueMapUpdateDialogProps {
  open: boolean;
  field: EntityField;
  value: string | number | boolean | undefined;
  onSave: (value: string | number | boolean | undefined) => void;
  onClose: () => void;
}

export function EntityValueMapUpdateDialog ({
  open, field, value, onSave, onClose,
}: EntityValueMapUpdateDialogProps) {
  const [newValue, setNewValue] = useState(value !== undefined ? value : field.initial);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          Update Value
          {' - '}
          {field.name}
        </b>
      </DialogTitle>

      <DialogContent>
        <ValueInput
          label="Value"
          value={newValue || ''}
          type={field.type as FieldType}
          onChange={setNewValue}
        />
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
          onClick={() => { onSave(newValue); onClose(); }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

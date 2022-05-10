import {
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityFieldExpression } from 'tabletop-assistant-common';
import ComputedDialog from './ComputedDialog';

interface ComputedInputProps {
  value: EntityFieldExpression;
  onChange: (value: EntityFieldExpression) => void;
}

const ComputedInput = ({
  value, onChange,
}: ComputedInputProps) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="Expression"
        value={value}
        onClick={() => setEditOpen(true)}
      />

      <ComputedDialog
        initial={value}
        open={editOpen}
        onSave={(newValue) => onChange(newValue)}
        onDelete={() => onChange({ expression: '', variables: {} })}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
};

export default ComputedInput;

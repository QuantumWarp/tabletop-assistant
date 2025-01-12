import { TextField } from '@mui/material';
import { useState } from 'react';
import { Expression } from '@tabletop-assistant/common';
import { ComputedDialog } from './ComputedDialog';

interface ComputedInputProps {
  value: Expression;
  onChange: (value: Expression) => void;
}

export function ComputedInput({
  value, onChange,
}: ComputedInputProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="Expression"
        value={value.expression}
        onClick={() => setEditOpen(true)}
      />

      <ComputedDialog
        initialExpression={value}
        open={editOpen}
        onSave={(newValue) => onChange(newValue)}
        onDelete={() => onChange({ expression: '', variables: [] })}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
};

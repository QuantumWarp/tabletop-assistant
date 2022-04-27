import {
  FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import FieldType from '../helpers/field.type';
import useIsFirstRender from '../helpers/is-first-render';

interface ValueInputProps {
  label: string;
  value: any;
  type: FieldType;
  onChange: (value: any) => void;
}

const ValueInput = ({
  label, value, type, onChange,
}: ValueInputProps) => {
  const isFirstRender = useIsFirstRender();

  const validNumber = (newValue: string) => /^-?[0-9]*\.?[0-9]*$/.test(newValue);

  useEffect(() => {
    if (isFirstRender) return;

    if (type === FieldType.Number) {
      onChange(0);
    } else if (type === FieldType.Boolean) {
      onChange(false);
    } else {
      onChange('');
    }
  }, [type, onChange, isFirstRender]);

  return (
    <>
      {type === FieldType.String && (
        <TextField
          fullWidth
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === FieldType.Boolean && (
        <FormControl fullWidth required>
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={value ? 1 : 0}
            onChange={(e) => onChange(e.target.value === 1)}
          >
            <MenuItem value={1}>True</MenuItem>
            <MenuItem value={0}>False</MenuItem>
          </Select>
        </FormControl>
      )}
      {type === FieldType.Number && (
        <TextField
          required
          fullWidth
          label={label}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value={value}
          onChange={(e) => validNumber(e.target.value) && onChange(e.target.value)}
        />
      )}
    </>
  );
};

export default ValueInput;

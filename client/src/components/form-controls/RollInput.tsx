import {
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { RollCombo } from 'tabletop-assistant-common';
import RollHelper from '../../helpers/roll.helper';
import RollDialog from './RollDialog';

interface RollInputProps {
  value: RollCombo;
  onChange: (roll: RollCombo) => void;
}

const RollInput = ({
  value, onChange,
}: RollInputProps) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="Roll"
        value={RollHelper.stringRepresentation(value)}
        onClick={() => setEditOpen(true)}
      />

      <RollDialog
        initial={value}
        open={editOpen}
        onSave={(newValue) => onChange(newValue)}
        onDelete={() => onChange([])}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
};

export default RollInput;

/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Chip,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Macro } from 'tabletop-assistant-common';
import { useGetEntitiesQuery } from '../../store/api';
import MacroDialog from './MacroDialog';

interface MacroInputProps {
  value: Macro[];
  onChange: (macros: Macro[]) => void;
}

const MacroInput = ({
  value, onChange,
}: MacroInputProps) => {
  const [editMacro, setEditMacro] = useState<Partial<Macro>>();
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  console.log(entities);

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        value={value}
        options={[] as Macro[]}
        clearIcon={false}
        renderInput={(params) => (
          <TextField {...params} label="Macros" onClick={() => setEditMacro({})} />
        )}
        renderTags={(macros, getTagProps) => macros.map((macro, index) => (
          <Chip
            {...getTagProps({ index })}
            variant="filled"
            label={macro.target}
            size="medium"
            onClick={(e) => { e.stopPropagation(); setEditMacro(macro); }}
            onDelete={() => onChange(value.filter((x) => x !== macro))}
          />
        ))}
      />

      {editMacro && (
        <MacroDialog
          initial={editMacro}
          open={Boolean(editMacro)}
          onSave={() => {}}
          onDelete={() => onChange(value.filter((x) => x !== editMacro))}
          onClose={() => setEditMacro(undefined)}
        />
      )}
    </>
  );
};

export default MacroInput;

/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Chip,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Macro } from '@/common';
import { useGetEntitiesQuery } from '../../store/api';
import ComputedDialog from './ComputedDialog';

interface MacroInputProps {
  value: Macro[];
  onChange: (macros: Macro[]) => void;
}

const MacroInput = ({
  value, onChange,
}: MacroInputProps) => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [editMacro, setEditMacro] = useState<Partial<Macro>>();

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
          // eslint-disable-next-line react/jsx-key
          <Chip
            {...getTagProps({ index })}
            variant="filled"
            label={entities?.find((x) => x._id === macro.target.entityId)?.name}
            size="medium"
            onClick={(e) => { e.stopPropagation(); setEditMacro(macro); }}
            onDelete={() => onChange(value.filter((x) => x !== macro))}
          />
        ))}
      />

      {editMacro && (
        <ComputedDialog
          includeTarget
          initialTarget={editMacro.target}
          initialExpression={editMacro.expression}
          open={Boolean(editMacro)}
          onSave={(expression, target) => onChange(value
            .filter((x) => x !== editMacro)
            .concat([{ target: target!, expression }]))}
          onDelete={() => onChange(value.filter((x) => x !== editMacro))}
          onClose={() => setEditMacro(undefined)}
        />
      )}
    </>
  );
};

export default MacroInput;

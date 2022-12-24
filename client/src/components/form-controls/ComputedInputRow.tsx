import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { ExpressionVariable } from 'tabletop-assistant-common';
import { useGetEntitiesQuery } from '../../store/api';

interface ComputedInputRowProps {
  name: string;
  value?: ExpressionVariable;
  onChange: (value: ExpressionVariable) => void;
}

const ComputedInputRow = ({
  name, value, onChange,
}: ComputedInputRowProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [entityId, setEntityId] = useState(value?.entityId);
  const [fieldKey, setFieldKey] = useState(value?.fieldKey);

  const entity = entities?.find((x) => x._id === entityId);

  if (entityId && fieldKey && entityId !== value?.entityId && fieldKey !== value?.fieldKey) {
    onChange({ key: name, entityId, fieldKey });
  }

  return (
    <>
      <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
        <b>{name}</b>
      </Grid>

      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel>Entity</InputLabel>
          <Select
            label="Entity"
            MenuProps={{ style: { maxHeight: '400px' } }}
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
          >
            {entities?.map((x) => (
              <MenuItem key={x._id} value={x._id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel>Field</InputLabel>
          <Select
            label="Field"
            MenuProps={{ style: { maxHeight: '400px' } }}
            value={fieldKey}
            onChange={(e) => setFieldKey(e.target.value)}
          >
            {entity?.fields?.map((x) => (
              <MenuItem key={x.key} value={x.key}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

ComputedInputRow.defaultProps = {
  value: undefined,
};

export default ComputedInputRow;

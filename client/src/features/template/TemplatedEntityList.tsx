import React from 'react';
import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { TemplatedEntity } from 'tabletop-assistant-common';

interface TemplatedEntityListProps {
  entities: TemplatedEntity[];
  selectedIds: string[];
  filter: string;
  onChange: (entity: TemplatedEntity, selected: boolean) => void;
}

const TemplatedEntityList = ({
  entities, selectedIds, filter, onChange,
}: TemplatedEntityListProps) => {
  const filtered = entities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormGroup>
      {sorted.map((entity) => (
        <FormControlLabel
          control={(
            <Checkbox
              checked={selectedIds.includes(entity._id)}
              onChange={(event) => onChange(entity, event.target.checked)}
            />
          )}
          label={entity.name}
        />
      ))}
    </FormGroup>
  );
};

export default TemplatedEntityList;

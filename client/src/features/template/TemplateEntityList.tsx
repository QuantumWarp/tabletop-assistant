import React from 'react';
import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Entity } from 'tabletop-assistant-common';

interface TemplateEntityListProps {
  entities: Entity[];
  selectedIds: string[];
  filter: string;
  onChange: (entity: Entity, selected: boolean) => void;
}

const TemplateEntityList = ({
  entities, selectedIds, filter, onChange,
}: TemplateEntityListProps) => {
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

export default TemplateEntityList;
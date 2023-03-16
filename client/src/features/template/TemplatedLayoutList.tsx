import React from 'react';
import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { TemplateLayout } from 'tabletop-assistant-common';

interface TemplatedLayoutListProps {
  layouts: TemplateLayout[];
  selectedIds: string[];
  filter: string;
  onChange: (layout: TemplateLayout, selected: boolean) => void;
}

const TemplatedLayoutList = ({
  layouts, selectedIds, filter, onChange,
}: TemplatedLayoutListProps) => {
  const filtered = layouts.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormGroup>
      {sorted.map((layout) => (
        <FormControlLabel
          control={(
            <Checkbox
              checked={selectedIds.includes(layout._id)}
              onChange={(event) => onChange(layout, event.target.checked)}
            />
          )}
          label={layout.name}
        />
      ))}
    </FormGroup>
  );
};

export default TemplatedLayoutList;

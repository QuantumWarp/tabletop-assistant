import React from 'react';
import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Template } from 'tabletop-assistant-common';

interface TemplateListProps {
  templates: Template[];
  selectedIds: string[];
  filter: string;
  onChange: (template: Template, selected: boolean) => void;
}

const TemplateList = ({
  templates, selectedIds, filter, onChange,
}: TemplateListProps) => {
  const filtered = templates.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormGroup>
      {sorted.map((template) => (
        <FormControlLabel
          control={(
            <Checkbox
              checked={selectedIds.includes(template._id)}
              onChange={(event) => onChange(template, event.target.checked)}
            />
          )}
          label={template.name}
        />
      ))}
    </FormGroup>
  );
};

export default TemplateList;

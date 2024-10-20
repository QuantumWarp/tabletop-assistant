import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Entity } from '@tabletop-assistant/common';

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
          key={entity.id}
          control={(
            <Checkbox
              checked={selectedIds.includes(entity.id)}
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

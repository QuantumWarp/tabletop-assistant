import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { TemplateGroup } from '@tabletop-assistant/common';

interface TemplateEntityListProps {
  groups: TemplateGroup[];
  selectedIds: string[];
  filter: string;
  onChange: (group: TemplateGroup, selected: boolean) => void;
}

const TemplateEntityList = ({
  groups, selectedIds, filter, onChange,
}: TemplateEntityListProps) => {
  const filtered = groups.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormGroup>
      {sorted.map((group) => (
        <FormControlLabel
          key={group._id}
          control={(
            <Checkbox
              checked={selectedIds.includes(group._id)}
              onChange={(event) => onChange(group, event.target.checked)}
            />
          )}
          label={group.name}
        />
      ))}
    </FormGroup>
  );
};

export default TemplateEntityList;

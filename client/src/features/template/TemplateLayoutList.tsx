import {
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Layout } from '@tabletop-assistant/common';

interface TemplateLayoutListProps {
  layouts: Layout[];
  selectedIds: string[];
  filter: string;
  onChange: (layout: Layout, selected: boolean) => void;
}

const TemplateLayoutList = ({
  layouts, selectedIds, filter, onChange,
}: TemplateLayoutListProps) => {
  const filtered = layouts.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormGroup>
      {sorted.map((layout) => (
        <FormControlLabel
          key={layout._id}
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

export default TemplateLayoutList;

import {
  Autocomplete, Grid2, TextField,
} from '@mui/material';
import { Entity } from '@tabletop-assistant/common';
import { IconifyDropdown } from '../../../components/IconifyDropdown';
import { ImageInput } from '../../../components/form-controls/ImageInput';

interface EntityInfoTabProps {
  entity: Partial<Entity>,
  onChange: (entity: Partial<Entity>) => void,
}

export function EntityInfoTab({ entity, onChange }: EntityInfoTabProps) {
  const entityChange = (partial: Partial<Entity>) => {
    onChange({ ...entity, ...partial });
  };

  return (
    <Grid2 container spacing={2} sx={{ py: 3 }}>
      <Grid2 size={8}>
        <TextField
          fullWidth
          required
          label="Name"
          value={entity.name}
          onChange={(e) => entityChange({ name: e.target.value })}
        />
      </Grid2>

      <Grid2 size={6}>
        <IconifyDropdown
          value={entity.icon}
          onChange={(newValue) => entityChange({ icon: newValue })}
        />
      </Grid2>

      <Grid2 size={6}>
        <ImageInput
          value={entity.imageId}
          onChange={(value) => entityChange({ imageId: value })}
        />
      </Grid2>

      <Grid2 size={12}>
        <Autocomplete
          multiple
          freeSolo
          clearOnBlur
          options={[]}
          filterSelectedOptions
          value={entity.tags}
          onChange={(_, newValue) => entityChange({ tags: (newValue as string[]).sort() })}
          renderInput={(params) => (
            <TextField
               
              {...params}
              label="Tags"
            />
          )}
        />
      </Grid2>

      <Grid2 size={12}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={10}
          value={entity.description}
          onChange={(e) => entityChange({ description: e.target.value })}
        />
      </Grid2>
    </Grid2>
  );
};

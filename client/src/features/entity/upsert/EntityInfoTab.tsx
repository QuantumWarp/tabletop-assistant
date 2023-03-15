import {
  Autocomplete, Grid, TextField,
} from '@mui/material';
import React from 'react';
import { Entity } from 'tabletop-assistant-common';
import IconifyDropdown from '../../../components/IconifyDropdown';
import ImageInput from '../../../components/form-controls/ImageInput';

interface ObjectInfoTabProps {
  entity: Partial<Entity>,
  onChange: (entity: Partial<Entity>) => void,
}

const ObjectInfoTab = ({ entity, onChange }: ObjectInfoTabProps) => {
  const entityChange = (partial: Partial<Entity>) => {
    onChange({ ...entity, ...partial });
  };

  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          required
          label="Name"
          value={entity.name}
          onChange={(e) => entityChange({ name: e.target.value })}
        />
      </Grid>

      <Grid item xs={6}>
        <IconifyDropdown
          value={entity.icon}
          onChange={(newValue) => entityChange({ icon: newValue })}
        />
      </Grid>

      <Grid item xs={6}>
        <ImageInput
          value={entity.imageUrl || ''}
          onChange={(value) => entityChange({ imageUrl: value })}
        />
      </Grid>

      <Grid item xs={12}>
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
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Tags"
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={10}
          value={entity.description}
          onChange={(e) => entityChange({ description: e.target.value })}
        />
      </Grid>
    </Grid>
  );
};

export default ObjectInfoTab;

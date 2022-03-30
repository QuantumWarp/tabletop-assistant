import {
  Autocomplete,
  FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, TextField,
} from '@mui/material';
import React from 'react';
import { Entity } from 'tabletop-assistant-common';
import TabletopIcon, { TabletopIconType } from '../../common/TabletopIcon';

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
        <FormControl fullWidth>
          <InputLabel>Icon</InputLabel>
          <Select
            label="Icon"
            MenuProps={{ style: { maxHeight: '400px' } }}
            value={entity.icon}
            renderValue={(x) => <>{x}</>}
            onChange={(e) => entityChange({ icon: e.target.value })}
          >
            {Object.values(TabletopIconType).map((x) => (
              <MenuItem key={x} value={x}>
                <ListItemIcon>
                  <TabletopIcon icon={x as TabletopIconType} />
                </ListItemIcon>
                <ListItemText primary={x} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          clearOnBlur
          options={[]}
          filterSelectedOptions
          value={entity.tags}
          onChange={(_, newValue) => entityChange({ tags: newValue as string[] })}
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

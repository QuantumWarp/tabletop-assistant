import {
  FormControl, Grid, InputLabel, MenuItem, Select, TextField,
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
    <Grid item container spacing={2}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          required
          label="Name"
          value={entity.name}
          onChange={(e) => entityChange({ name: e.target.value })}
        />
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Icon</InputLabel>
          <Select
            label="Icon"
            MenuProps={{ style: { maxHeight: '400px' } }}
            value={entity.icon}
            onChange={(e) => entityChange({ icon: e.target.value })}
          >
            {Object.values(TabletopIconType).map((x) => (
              <MenuItem
                key={x}
                value={x}
              >
                <div className="icon-menu-item">
                  <TabletopIcon icon={x as TabletopIconType} />
                  <span>{x}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={entity.description}
          onChange={(e) => entityChange({ description: e.target.value })}
        />
      </Grid>
    </Grid>
  );
};

export default ObjectInfoTab;

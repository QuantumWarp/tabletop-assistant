import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import DisplayType from '../../models/layout/display-type';
import GameObject from '../../models/objects/game-object';

interface ObjectExampleLayoutProps {
  obj: Partial<GameObject>;
}

const ObjectExampleLayout = ({ obj }: ObjectExampleLayoutProps) => {
  const [displayType, setDisplayType] = useState(obj.name || '');

  return (
    <div>
      <Select
        fullWidth
        label="Icon"
        value={displayType}
        onChange={(e) => setDisplayType(e.target.value)}
      >
        {Object.values(DisplayType).map((x) => (
          <MenuItem
            key={x}
            value={x}
          >
            {x}
          </MenuItem>
        ))}
      </Select>

      Layout
    </div>
  );
};

export default ObjectExampleLayout;

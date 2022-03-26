import {
  Button, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityDisplay } from 'tabletop-assistant-common';
import EditDisplayDialog from './EditDisplayDialog';

interface EntityDisplayTabProps {
  displays: EntityDisplay[],
  onChange: (displays: EntityDisplay[]) => void,
}

const ObjectDisplayTab = ({ displays, onChange }: EntityDisplayTabProps) => {
  const [editDisplay, setEditDisplay] = useState<Partial<EntityDisplay>>();

  return (
    <div>
      {displays.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No Displays Created
        </Typography>
      )}

      {displays.map((display) => (
        <ListItem
          dense
          key={display.type}
        >
          <ListItemButton onClick={() => setEditDisplay(display)}>
            <ListItemText primary={display.type} />
          </ListItemButton>
        </ListItem>
      ))}

      <Button
        variant="outlined"
        onClick={() => setEditDisplay({})}
      >
        Add Display
      </Button>

      {editDisplay && (
        <EditDisplayDialog
          initial={editDisplay}
          open={Boolean(editDisplay)}
          onClose={() => setEditDisplay(undefined)}
          onSave={(display) => onChange(displays
            .filter((x) => x !== editDisplay).concat([display]))}
        />
      )}
    </div>
  );
};

export default ObjectDisplayTab;

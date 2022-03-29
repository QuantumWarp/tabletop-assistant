import {
  Button, Chip, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityDisplay, EntityField } from 'tabletop-assistant-common';
import EditDisplayDialog from './EditDisplayDialog';

interface EntityDisplayTabProps {
  displays: EntityDisplay[],
  fields: EntityField[],
  onChange: (displays: EntityDisplay[]) => void,
}

const ObjectDisplayTab = ({
  displays, fields, onChange,
}: EntityDisplayTabProps) => {
  const [editDisplay, setEditDisplay] = useState<Partial<EntityDisplay>>();

  return (
    <Grid container spacing={2} sx={{ py: 2, height: '100%' }}>
      <Grid item xs={8}>
        {displays.length === 0 && (
          <Typography variant="h5" color="text.secondary">
            No Displays Created
          </Typography>
        )}

        {displays.map((display) => (
          <ListItem key={display.type}>
            <ListItemButton onClick={() => setEditDisplay(display)}>
              <ListItemText primary={display.type} />
              <Chip v-if={display.default} label="Default" />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>

      <Grid item>
        <Divider orientation="vertical" />
      </Grid>

      <Grid item xs>
        <Typography variant="body2" color="text.secondary">
          Create a display to represent this object visually when put onto a tabletop.
        </Typography>

        <Button
          sx={{ my: 2 }}
          variant="outlined"
          onClick={() => setEditDisplay({})}
        >
          Add Display
        </Button>
      </Grid>

      {editDisplay && (
        <EditDisplayDialog
          initial={editDisplay}
          open={Boolean(editDisplay)}
          fields={fields}
          onSave={(dis) => onChange(displays.filter((x) => x !== editDisplay).concat([dis]))}
          onDelete={() => onChange(displays.filter((x) => x !== editDisplay))}
          onClose={() => setEditDisplay(undefined)}
        />
      )}
    </Grid>
  );
};

export default ObjectDisplayTab;

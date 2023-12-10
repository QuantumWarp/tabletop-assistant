import {
  Button, Chip, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CreateEntity, EntityDisplay, EntityDisplayType } from '@/common';
import DisplayHelper from '../../../helpers/display.helper';
import EditDisplayDialog from './EditDisplayDialog';

interface EntityDisplayTabProps {
  displays: EntityDisplay[],
  entity: CreateEntity,
  onChange: (displays: EntityDisplay[]) => void,
}

const ObjectDisplayTab = ({
  displays, entity, onChange,
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
              <ListItemText
                primary={DisplayHelper.displayName(display.type as EntityDisplayType)}
              />
              {display.default && (<Chip label="Default" />)}
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
          displays={displays}
          entity={entity}
          open={Boolean(editDisplay)}
          onSave={(display) => onChange(
            displays.filter((x) => x !== editDisplay)
              .concat([display])
              .sort((a, b) => (a.type > b.type ? 1 : -1)),
          )}
          onDelete={() => onChange(displays.filter((x) => x !== editDisplay))}
          onClose={() => setEditDisplay(undefined)}
        />
      )}
    </Grid>
  );
};

export default ObjectDisplayTab;

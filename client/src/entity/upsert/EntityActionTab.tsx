import {
  Button, Chip, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityAction } from 'tabletop-assistant-common';
import EditActionDialog from './EditActionDialog';

interface EntityActionTabProps {
  actions: EntityAction[],
  onChange: (displays: EntityAction[]) => void,
}

const EntityActionTab = ({ actions, onChange }: EntityActionTabProps) => {
  const [editAction, setEditAction] = useState<Partial<EntityAction>>();

  return (
    <Grid container spacing={2} sx={{ py: 2, height: '100%' }}>
      <Grid item xs={8}>
        {actions.length === 0 && (
          <Typography variant="h5" color="text.secondary">
            No Actions Created
          </Typography>
        )}

        {actions.map((action) => (
          <ListItem key={action.key}>
            <ListItemButton onClick={() => setEditAction(action)}>
              <ListItemText primary={action.name} />
              <Chip v-if={action.roll} label="Roll" />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>

      <Grid item>
        <Divider orientation="vertical" />
      </Grid>

      <Grid item xs>
        <Typography variant="body2" color="text.secondary">
          Create an action that can perform a roll or provide information when clicked.
        </Typography>

        <Button
          sx={{ my: 2 }}
          variant="outlined"
          onClick={() => setEditAction({})}
        >
          Add Action
        </Button>
      </Grid>

      {editAction && (
        <EditActionDialog
          initial={editAction}
          open={Boolean(editAction)}
          onSave={(action) => onChange(actions.filter((x) => x !== editAction).concat([action]))}
          onDelete={() => onChange(actions.filter((x) => x !== editAction))}
          onClose={() => setEditAction(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityActionTab;

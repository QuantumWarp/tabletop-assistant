import {
  Button, Chip, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import { useState } from 'react';
import { CreateEntity, EntityAction } from '@tabletop-assistant/common';
import EditActionDialog from './EditActionDialog';

interface EntityActionTabProps {
  actions: EntityAction[],
  entity: CreateEntity,
  onChange: (displays: EntityAction[]) => void,
}

const EntityActionTab = ({
  actions, entity, onChange,
}: EntityActionTabProps) => {
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
              {action.roll && (<Chip label="Roll" />)}
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
          entity={entity}
          open={Boolean(editAction)}
          onSave={(action) => onChange(
            actions.filter((x) => x !== editAction)
              .concat([action])
              .sort((a, b) => (a.name > b.name ? 1 : -1)),
          )}
          onDelete={() => onChange(actions.filter((x) => x !== editAction))}
          onClose={() => setEditAction(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityActionTab;

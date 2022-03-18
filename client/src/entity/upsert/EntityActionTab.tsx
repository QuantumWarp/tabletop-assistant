import {
  Button, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityAction } from 'tabletop-assistant-common';
import EditActionDialog from './EditActionDialog';

interface ObjectActionTabProps {
  actions: EntityAction[],
  onChange: (displays: EntityAction[]) => void,
}

const ObjectActionTab = ({ actions, onChange }: ObjectActionTabProps) => {
  const [editAction, setEditAction] = useState<Partial<EntityAction>>();

  return (
    <div>
      {actions.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No Actions Created
        </Typography>
      )}

      {actions.map((action) => (
        <ListItem
          dense
          key={action.key}
        >
          <ListItemButton onClick={() => setEditAction(action)}>
            <ListItemText primary={action.name} />
          </ListItemButton>
        </ListItem>
      ))}

      <Button
        variant="outlined"
        onClick={() => setEditAction({})}
      >
        Add Field
      </Button>

      {editAction && (
        <EditActionDialog
          initial={editAction}
          open={Boolean(editAction)}
          onClose={() => setEditAction(undefined)}
          onSave={(action) => onChange(actions.filter((x) => x !== editAction).concat([action]))}
        />
      )}
    </div>
  );
};

export default ObjectActionTab;

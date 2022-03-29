import {
  Button, Chip, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityField } from 'tabletop-assistant-common';
import EditFieldDialog from './EditFieldDialog';

interface EntityFieldTabProps {
  fields: EntityField[],
  onChange: (fields: EntityField[]) => void,
}

const EntityFieldTab = ({ fields, onChange }: EntityFieldTabProps) => {
  const [editField, setEditField] = useState<Partial<EntityField>>();

  return (
    <Grid container spacing={2} sx={{ py: 2, height: '100%' }}>
      <Grid item xs={8}>
        {fields.length === 0 && (
          <Typography variant="h5" color="text.secondary">
            No Fields Created
          </Typography>
        )}

        {fields.map((field) => (
          <ListItem key={field.key}>
            <ListItemButton onClick={() => setEditField(field)}>
              <ListItemText primary={field.name} />
              <Chip label={field.type} />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>

      <Grid item>
        <Divider orientation="vertical" />
      </Grid>

      <Grid item xs>
        <Typography variant="body2" color="text.secondary">
          Create a field to represent properties on the object.
        </Typography>

        <Button
          sx={{ my: 2 }}
          variant="outlined"
          onClick={() => setEditField({})}
        >
          Add Field
        </Button>
      </Grid>

      {editField && (
        <EditFieldDialog
          initial={editField}
          open={Boolean(editField)}
          onSave={(field) => onChange(fields.filter((x) => x !== editField).concat([field]))}
          onDelete={() => onChange(fields.filter((x) => x !== editField))}
          onClose={() => setEditField(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityFieldTab;

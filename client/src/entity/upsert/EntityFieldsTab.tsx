import {
  Button, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EntityField } from 'tabletop-assistant-common';
import EditFieldDialog from './EditFieldDialog';

interface ObjectFieldsTabProps {
  fields: EntityField[],
  onChange: (fields: EntityField[]) => void,
}

const ObjectFieldsTab = ({ fields, onChange }: ObjectFieldsTabProps) => {
  const [editField, setEditField] = useState<Partial<EntityField>>();

  return (
    <div>
      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No Fields Created
        </Typography>
      )}

      {fields.map((field) => (
        <ListItem
          dense
          key={field.key}
        >
          <ListItemButton onClick={() => setEditField(field)}>
            <ListItemText primary={field.name} />
          </ListItemButton>
        </ListItem>
      ))}

      <Button
        variant="outlined"
        onClick={() => setEditField({})}
      >
        Add Field
      </Button>

      {editField && (
        <EditFieldDialog
          initial={editField}
          open={Boolean(editField)}
          onClose={() => setEditField(undefined)}
          onSave={(field) => onChange(fields.filter((x) => x !== editField).concat([field]))}
        />
      )}
    </div>
  );
};

export default ObjectFieldsTab;

import {
  Button, Chip, Divider, Grid2, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import { useState } from 'react';
import { EntityField } from '@tabletop-assistant/common';
import { FieldHelper } from '../../../helpers/field.helper';
import { FieldType } from '../../../models/field.type';
import { EditFieldDialog } from './EditFieldDialog';

interface EntityFieldTabProps {
  fields: EntityField[],
  onChange: (fields: EntityField[]) => void,
}

export function EntityFieldTab({ fields, onChange }: EntityFieldTabProps) {
  const [editField, setEditField] = useState<Partial<EntityField>>();

  return (
    <Grid2 container spacing={2} sx={{ py: 2, height: '100%' }}>
      <Grid2 size={8}>
        {fields.length === 0 && (
          <Typography variant="h5" color="text.secondary">
            No Fields Created
          </Typography>
        )}

        {fields.map((field) => (
          <ListItem key={field.name}>
            <ListItemButton onClick={() => setEditField(field)}>
              <ListItemText primary={field.name} />
              <Chip label={FieldHelper.displayName(field.type as FieldType)} />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid2>

      <Grid2>
        <Divider orientation="vertical" />
      </Grid2>

      <Grid2>
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
      </Grid2>

      {editField && (
        <EditFieldDialog
          initial={editField}
          open={Boolean(editField)}
          onSave={(field) => onChange(
            fields.filter((x) => x !== editField)
              .concat([field])
              .sort((a, b) => (a.name > b.name ? 1 : -1)),
          )}
          onDelete={() => onChange(fields.filter((x) => x !== editField))}
          onClose={() => setEditField(undefined)}
        />
      )}
    </Grid2>
  );
};

export default EntityFieldTab;

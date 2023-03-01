import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { CreateEntity, EntityField, FieldValueMapping } from 'tabletop-assistant-common';
import EntityValueUpdateDialog from './EntityValueUpdateDialog';

interface EntitySummaryDialogProps {
  entity: CreateEntity;
  fieldMappings: FieldValueMapping[];
  open: boolean;
  onSave?: (values: FieldValueMapping[]) => void;
  onClose: () => void;
}

const EntitySummaryDialog = ({
  entity, fieldMappings, open, onSave, onClose,
}: EntitySummaryDialogProps) => {
  const [editField, setEditField] = useState<EntityField>();
  const [updates, setUpdates] = useState<FieldValueMapping[]>([]);

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container>
          {entity.icon && (
            <Grid item pr={2} alignItems="center">
              <Icon width={30} icon={entity.icon} />
            </Grid>
          )}
          <b>{entity.name}</b>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ py: 2, height: '100%' }}>
          <Grid item xs={7}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {entity.description}
            </Typography>
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs>
            {entity.fields.map((field) => {
              const mapping = fieldMappings.find((x) => Boolean(x.fieldKey));
              const value = mapping ? mapping.value : field.initial;
              const text = field.name;

              const updatedMapping = updates.find((x) => x.fieldKey === field.key);
              const currentValue = updatedMapping?.value !== undefined
                ? updatedMapping.value : value;
              const fullValue = (field?.prefix ? field?.prefix : '')
                + currentValue
                + (field?.postfix ? field?.postfix : '');

              return (
                <ListItem
                  dense
                  key={field.key}
                >
                  <ListItemButton onClick={() => setEditField(field)} disabled={!onSave}>
                    <ListItemText primary={text} secondary={fullValue.toString()} />
                  </ListItemButton>
                </ListItem>
              );
            })}

            {editField && (
              <EntityValueUpdateDialog
                open={Boolean(editField)}
                field={editField}
                value={fieldMappings.find((x) => x.fieldKey === editField.key)?.value}
                onSave={(value) => setUpdates(updates
                  .filter((x) => x.fieldKey === editField.key)
                  .concat({ fieldKey: editField.key, value }))}
                onClose={() => setEditField(undefined)}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => onClose()}
          variant="outlined"
        >
          {Object.keys(updates).length === 0 ? 'Close' : 'Cancel'}
        </Button>

        {onSave && Object.keys(updates).length > 0 && (
          <Button
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={() => { onSave(updates); onClose(); }}
          >
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

EntitySummaryDialog.defaultProps = {
  onSave: undefined,
};

export default EntitySummaryDialog;

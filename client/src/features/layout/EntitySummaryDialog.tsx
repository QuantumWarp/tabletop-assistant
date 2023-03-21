import React, { useState } from 'react';
import {
  Box,
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
import ReactMarkdown from 'react-markdown';
import { CreateEntity, EntityField } from 'tabletop-assistant-common';
import EntityValueUpdateDialog from './EntityValueUpdateDialog';
import { Mapping } from '../../models/mapping';
import './EntitySummaryDialog.css';

interface EntitySummaryDialogProps {
  entity: CreateEntity;
  mappings: Mapping[];
  open: boolean;
  onSave?: (updates: Mapping[]) => void;
  onClose: () => void;
}

const EntitySummaryDialog = ({
  entity, mappings, open, onSave, onClose,
}: EntitySummaryDialogProps) => {
  const [editField, setEditField] = useState<EntityField>();
  const [updates, setUpdates] = useState<Mapping[]>([]);

  const editMapping = editField && mappings.find((x) => x.fieldKey === editField.key);

  return (
    <Dialog className="entity-summary-dialog" open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
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
              {entity.description && (
                <ReactMarkdown>{entity.description}</ReactMarkdown>
              )}
            </Typography>

            {entity.imageUrl && (
              <Box display="flex" justifyContent="center">
                <img
                  src={entity.imageUrl}
                  alt={entity.name}
                />
              </Box>
            )}
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs>
            {entity.fields.map((field) => {
              const mapping = mappings.find((x) => x.fieldKey === field.key);

              return (
                <ListItem
                  dense
                  key={field.key}
                >
                  <ListItemButton onClick={() => setEditField(field)} disabled={!onSave}>
                    <ListItemText
                      primary={field.name}
                      secondary={mapping?.value || 'No value found'}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}

            {editField && editMapping && (
              <EntityValueUpdateDialog
                open={Boolean(editField)}
                field={editField}
                value={editMapping.value}
                onSave={(value) => setUpdates(updates
                  .filter((x) => x.fieldKey === editField.key)
                  .concat({ ...editMapping, value }))}
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

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
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
import { CreateEntity, EntityField } from '@tabletop-assistant/common';
import { EntityValueMapUpdateDialog } from './EntityValueMapUpdateDialog';
import { Mapping } from '../../models/mapping';
import { useGetImageQuery } from '../../store/api';

interface EntitySummaryDialogProps {
  entity: CreateEntity;
  mappings: Mapping[];
  open: boolean;
  onSave?: (updates: Mapping[]) => void;
  onClose: () => void;
}

export function EntitySummaryDialog({
  entity, mappings, open, onSave, onClose,
}: EntitySummaryDialogProps) {
  const [editField, setEditField] = useState<EntityField>();
  const [updates, setUpdates] = useState<Mapping[]>([]);

  const editMapping = editField && mappings.find((x) => x.fieldKey === editField.key);

  const { data: image } = useGetImageQuery(
    entity.imageId!,
    { skip: !entity.imageId }
  );
  
  return (
    <Dialog className="entity-instance-dialog" open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid2 container>
          {entity.icon && (
            <Grid2 pr={2} alignItems="center">
              <Icon width={30} icon={entity.icon} />
            </Grid2>
          )}
          <b>{entity.name}</b>
        </Grid2>
      </DialogTitle>

      <DialogContent>
        <Grid2 container spacing={2} sx={{ py: 2, height: '100%' }}>
          <Grid2 size={7}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {entity.description && (
                <ReactMarkdown>{entity.description}</ReactMarkdown>
              )}
            </Typography>

            {image && (
              <Box display="flex" justifyContent="center">
                <img
                  src={image.blob}
                  alt={entity.name}
                  style={{
                    marginTop: "20px",
                    maxWidth: "100%",
                    maxHeight: "400px",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            )}
          </Grid2>

          <Grid2>
            <Divider orientation="vertical" />
          </Grid2>

          <Grid2>
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
              <EntityValueMapUpdateDialog
                open={Boolean(editField)}
                field={editField}
                value={editMapping.value}
                onSave={(value) => setUpdates(updates
                  .filter((x) => x.fieldKey === editField.key)
                  .concat({ ...editMapping, value }))}
                onClose={() => setEditField(undefined)}
              />
            )}
          </Grid2>
        </Grid2>
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

import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { Entity } from 'tabletop-assistant-common';
import { useCreateValueMapsMutation, useGetEntityTemplatesQuery } from '../../store/api';

interface TemplateEntityDialogProps {
  tag: string;
  open: boolean;
  onClose: () => void;
}

const TemplateEntityDialog = ({
  tag, open, onClose,
}: TemplateEntityDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: templates } = useGetEntityTemplatesQuery(tag);
  const [createValues] = useCreateValueMapsMutation();
  const [selectedEntityIds, setSelectedEntityIds] = useState<Set<string>>(new Set());

  const handleToggle = (entity: Entity) => {
    const newSet = new Set(selectedEntityIds);
    const removed = newSet.delete(entity._id);
    if (!removed) newSet.add(entity._id);
    setSelectedEntityIds(newSet);
  };

  const handleSave = async () => {
    const createValueMaps = Array.from(selectedEntityIds)
      .map((x) => ({ entityId: x, tabletopId, mappings: [] }));
    await createValues(createValueMaps);
    onClose();
  };

  return (
    <Dialog className="entity-instance-dialog" open={open} onClose={() => onClose()} maxWidth="xs" fullWidth>
      <DialogTitle>
        <b>Add Templates</b>
      </DialogTitle>

      <DialogContent>
        <List dense>
          {templates?.map((entity) => (
            <ListItem
              key={entity._id}
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => handleToggle(entity)}>
                <ListItemIcon>
                  {entity.icon && <Icon icon={entity.icon} />}
                </ListItemIcon>
                <ListItemText primary={entity.name} secondary={entity.tags.filter((x) => x !== tag).join(', ')} />
                <Checkbox
                  edge="start"
                  checked={selectedEntityIds.has(entity._id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => onClose()}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => handleSave()}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateEntityDialog;

import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { Entity } from 'tabletop-assistant-common';
import { useCreateValueMapsMutation, useGetEntitiesQuery, useGetUserCreatedEntitiesQuery } from '../../store/api';

interface ExistingEntityDialogProps {
  tag: string;
  open: boolean;
  onClose: () => void;
}

const ExistingEntityDialog = ({
  tag, open, onClose,
}: ExistingEntityDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();

  const { data: allEntities } = useGetUserCreatedEntitiesQuery();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [createValues] = useCreateValueMapsMutation();

  const [filter, setFilter] = useState('');
  const [selectedEntityIds, setSelectedEntityIds] = useState<Set<string>>(new Set());

  const entityIds = entities?.map((x) => x._id);
  const availableEntities = allEntities?.filter((x) => !entityIds?.includes(x._id));

  const filteredEntities = availableEntities
    ? availableEntities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())
      || x.tags.find((t) => t.toLowerCase() === filter.toLowerCase()))
    : [];
  const sortedEntities = filteredEntities.sort(
    (a, b) => (a.name > b.name ? 1 : -1),
  );

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
        <b>Add Existing Object</b>
      </DialogTitle>

      <DialogContent sx={{ maxHeight: '600px' }}>
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <List dense>
          {sortedEntities?.map((entity) => (
            <>
              <ListItem
                key={entity._id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={() => handleToggle(entity)}>
                  <ListItemIcon>
                    {entity.icon && <Icon icon={entity.icon} height={30} />}
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
              <Divider component="li" />
            </>
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

export default ExistingEntityDialog;

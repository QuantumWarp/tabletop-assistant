import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ValuesIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entity } from '@tabletop-assistant/common';
import { useDeleteValueMapMutation, useGetEntitiesQuery, useGetValueMapsQuery } from '../../store/api';
import EntityInstanceDialog from './EntityInstanceDialog';
import EntityUpsertDialog from '../entity/upsert/EntityUpsertDialog';

interface EntityInstanceListProps {
  tag: string;
  filter: string;
}

const EntityInstanceList = ({ tag, filter }: EntityInstanceListProps) => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [deleteValue] = useDeleteValueMapMutation();

  const [editEntity, setEditEntity] = useState<Entity | undefined>();
  const [editEntityValue, setEditEntityValue] = useState<Entity | undefined>();
  const editValueMap = valueMaps?.find((x) => x.entityId === editEntityValue?._id);

  const filteredEntities = entities
    ? entities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())
      || x.tags.find((t) => t.toLowerCase() === filter.toLowerCase()))
    : [];
  const sortedEntities = filteredEntities.sort(
    (a, b) => (a.name > b.name ? 1 : -1),
  );

  return (
    <Grid container justifyContent="center">
      <List dense sx={{ width: '100%', maxWidth: '600px' }}>
        {sortedEntities?.map((entity) => (
          <>
            <ListItem
              key={entity._id}
              disablePadding
            >
              <ListItemButton onClick={() => setEditEntityValue(entity)}>
                <ListItemIcon>
                  {entity.icon && <Icon icon={entity.icon} height={30} />}
                </ListItemIcon>

                <ListItemText primary={entity.name} secondary={entity.tags.filter((x) => x !== tag).join(', ')} />

                <ListItemSecondaryAction>
                  <IconButton onClick={(e) => { setEditEntityValue(entity); e.stopPropagation(); }}>
                    <ValuesIcon />
                  </IconButton>

                  <IconButton onClick={(e) => { setEditEntity(entity); e.stopPropagation(); }}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={(e) => { deleteValue(entity._id); e.stopPropagation(); }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>

      {editEntityValue && editValueMap && (
        <EntityInstanceDialog
          entity={editEntityValue}
          mappings={editValueMap.mappings.map((x) => ({ entityId: editEntityValue._id, ...x }))}
          open={Boolean(editEntityValue)}
          onClose={() => setEditEntityValue(undefined)}
        />
      )}

      {editEntity && (
        <EntityUpsertDialog
          initial={editEntity}
          open={Boolean(editEntity)}
          onClose={() => setEditEntity(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityInstanceList;

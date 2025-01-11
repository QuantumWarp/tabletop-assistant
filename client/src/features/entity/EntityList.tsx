import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ValuesIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entity } from '@tabletop-assistant/common';
import { useDeleteValueMapMutation, useGetEntitiesQuery, useGetValueMapsQuery } from '../../store/api';
import { EntitySummaryDialog } from './EntitySummaryDialog';
import { EntityUpsertDialog } from './upsert/EntityUpsertDialog';

interface EntityInstanceListProps {
  filter: string;
}

export function EntityList({ filter }: EntityInstanceListProps) {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [deleteValue] = useDeleteValueMapMutation();

  const [editEntity, setEditEntity] = useState<Entity | undefined>();
  const [editEntityValue, setEditEntityValue] = useState<Entity | undefined>();
  const editValueMap = valueMaps?.find((x) => x.entityId === editEntityValue?.id);

  const filteredEntities = entities
    ? entities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())
      || x.tags.find((t) => t.toLowerCase() === filter.toLowerCase()))
    : [];
  const sortedEntities = filteredEntities.sort(
    (a, b) => (a.name > b.name ? 1 : -1),
  );

  return (
    <Box display="flex" justifyContent="center">
      <List dense sx={{ width: '100%', maxWidth: '600px' }}>
        {sortedEntities?.map((entity) => (
          <Fragment key={entity.id}>
            <ListItem
              key={entity.id}
              disablePadding
            >
              <ListItemButton onClick={() => setEditEntityValue(entity)}>
                <ListItemIcon>
                  {entity.icon && <Icon icon={entity.icon} height={30} />}
                </ListItemIcon>

                <ListItemText primary={entity.name} secondary={entity.tags.join(', ')} />

                <Box>
                  <IconButton onClick={(e) => { setEditEntityValue(entity); e.stopPropagation(); }}>
                    <ValuesIcon />
                  </IconButton>

                  <IconButton onClick={(e) => { setEditEntity(entity); e.stopPropagation(); }}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={(e) => { deleteValue(entity.id); e.stopPropagation(); }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItemButton>
            </ListItem>

            <Divider component="li" />
          </Fragment>
        ))}
      </List>

      {editEntityValue && editValueMap && (
        <EntitySummaryDialog
          entity={editEntityValue}
          mappings={editValueMap.mappings.map((x) => ({ entityId: editEntityValue.id, ...x }))}
          open={Boolean(editEntityValue)}
          onClose={() => setEditEntityValue(undefined)}
        />
      )}

      {editEntity && (
        <EntityUpsertDialog
          initial={editEntity}
          tabletopId={tabletopId}
          open={Boolean(editEntity)}
          onClose={() => setEditEntity(undefined)}
        />
      )}
    </Box>
  );
};

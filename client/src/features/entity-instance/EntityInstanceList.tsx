import {
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entity } from 'tabletop-assistant-common';
import { useGetEntitiesQuery, useGetValueMapsQuery } from '../../store/api';
import ValueMapCard from './EntityInstanceCard';
import EntityInstanceDialog from './EntityInstanceDialog';

interface EntityInstanceListProps {
  filter: string;
}

const EntityInstanceList = ({ filter }: EntityInstanceListProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const [editEntity, setEditEntity] = useState<Entity | undefined>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  const filteredEntities = entities
    ? entities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())
      || x.tags.find((tag) => tag.toLowerCase() === filter.toLowerCase()))
    : [];
  const sortedEntities = filteredEntities.sort(
    (a, b) => (a.name > b.name ? 1 : -1),
  );

  const editValueMap = valueMaps?.find((x) => x.entityId === editEntity?._id);

  return (
    <Grid container spacing={6}>
      {sortedEntities.map((entity) => (
        <Grid key={entity._id} item xs={4}>
          <ValueMapCard
            entity={entity}
            onClick={() => setEditEntity(entity)}
          />
        </Grid>
      ))}

      {editEntity && editValueMap && (
        <EntityInstanceDialog
          entity={editEntity}
          mappings={editValueMap.mappings.map((x) => ({ entityId: editEntity._id, ...x }))}
          open={Boolean(editEntity)}
          onClose={() => setEditEntity(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityInstanceList;

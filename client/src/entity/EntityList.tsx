import {
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entity } from 'tabletop-assistant-common';
import EntityUpsertDialog from './upsert/EntityUpsertDialog';
import { useGetEntitiesQuery } from '../store/api';
import EntityCard from './EntityCard';

interface EntityListProps {
  filter: string;
}

const EntityList = ({ filter }: EntityListProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const [editEntity, setEditEntity] = useState<Entity | undefined>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const filteredEntities = entities
    ? entities.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedEntities = filteredEntities.sort(
    (a, b) => (a.name > b.name ? -1 : 1),
  );

  return (
    <Grid container spacing={6}>
      {sortedEntities.map((entity) => (
        <Grid key={entity._id} item xs={4}>
          <EntityCard
            entity={entity}
            onClick={() => setEditEntity(entity)}
          />
        </Grid>
      ))}

      {editEntity && (
        <EntityUpsertDialog
          initial={editEntity}
          tabletopId={tabletopId}
          open={Boolean(editEntity)}
          onClose={() => setEditEntity(undefined)}
        />
      )}
    </Grid>
  );
};

export default EntityList;

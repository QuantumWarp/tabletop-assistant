import { useParams } from 'react-router-dom';
import { Mapping } from '../../models/mapping.js';
import { useGetEntitiesQuery } from '../../store/api';
import FieldHelper from '../field.helper';
import { useMappings } from './use-mappings';

export function useMappingEntities(entityIds: string[]) {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const filteredEntities = (entities || [])
    .filter((x) => entityIds.includes(x.id));

  const emptyMappings = filteredEntities
    .reduce((arr, x) => ([
      ...arr,
      ...FieldHelper.getFields(x).map((field) => ({
        entityId: x.id,
        fieldKey: field.key,
        value: undefined,
      })),
    ]), [] as Mapping[]);

  const mappings = useMappings(emptyMappings);
  if (!mappings) return undefined;

  const results = entityIds.map((entityId) => ({
    entityId,
    mappings: mappings.filter((x) => x.entityId === entityId),
  }));

  return results;
}

export function useMappingEntity(entityId: string) {
  const results = useMappingEntities([entityId]);
  if (!results) return undefined;
  return results.find((x) => x.entityId === entityId)?.mappings || [];
}

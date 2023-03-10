import { useParams } from 'react-router-dom';
import { Mapping } from '../../models/mapping.js';
import { useGetEntitiesQuery } from '../../store/api';
import useMappings from './use-mappings.js';

export default function useEntityMappings(entityIds: string[]) {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const filteredEntities = (entities || [])
    .filter((x) => entityIds.includes(x._id));

  const emptyMappings = filteredEntities
    .reduce((arr, x) => ([
      ...arr,
      ...x.fields.map((field) => ({
        entityId: x._id,
        fieldKey: field.key,
        value: null,
      })),
    ]), [] as Mapping[]);

  const mappings = useMappings(emptyMappings);
  return mappings;
}

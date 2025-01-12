import { useParams } from 'react-router-dom';
import { useCreateValueMapMutation, useGetEntityQuery, useGetValueMapsQuery } from '../../store/api';
import { useEffect } from 'react';

export function useMappingEntity(entityId: string) {
  const { tabletopId } = useParams() as { tabletopId: string };

  const { data: entity } = useGetEntityQuery(entityId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [createValueMap] = useCreateValueMapMutation();

  useEffect(() => {
    if (!entity) return;
    if (!valueMaps) return;

    for (const field of entity.fields) {
      const valueMap = valueMaps.find((x) => x.fieldKey === field.key);
      if (!valueMap) {
        createValueMap({ entityId, fieldKey: field.key, tabletopId, value: field.initial });
      }
    }
  }, [valueMaps]);

  return (valueMaps || []).filter((x) => x.entityId === entityId);
}

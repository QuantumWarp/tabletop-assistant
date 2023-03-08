import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Expression } from 'tabletop-assistant-common';
import { useDebouncedCallback } from 'use-debounce';
import { Mapping } from '../../models/mapping';
import { useGetValueMapsQuery, useGetEntitiesQuery, useUpdateValueMapMutation } from '../../store/api';
import { selectMappings, setMappings } from '../../store/mapping-slice';
import { useAppDispatch } from '../../store/store';
import MappingResolver from '../mapping-resolver';

export default function useMappingHelper() {
  const dispatch = useAppDispatch();

  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [updateValues] = useUpdateValueMapMutation();

  const mappings = useSelector(selectMappings);
  const resolver = useMemo(() => new MappingResolver(), []);

  useEffect(() => {
    resolver.reset(mappings, entities, valueMaps);
  }, [resolver, mappings, entities, valueMaps]);

  const debouncedUpdate = useDebouncedCallback(
    async () => resolver.valueMapUpdates().map((x) => updateValues(x)),
    1500,
  );

  return {
    getForEntity: (entityId: string) => {
      const entity = entities?.find((x) => x._id === entityId);
      if (!entity) return [];
      const entityEntries = entity.fields.map((x) => resolver.get(entityId, x.key));
      dispatch(setMappings(resolver.mappings));
      return entityEntries;
    },
    calculate: (expression: Expression) => {
      const result = resolver.compute(expression);
      dispatch(setMappings(resolver.mappings));
      return result;
    },
    update: (updatedMappings: Mapping[]) => {
      resolver.mappings.map((mapping) => {
        const update = updatedMappings
          .find((x) => x.entityId === mapping.entityId && x.fieldKey === mapping.fieldKey);
        return update ? { ...mapping, value: update.value } : mapping;
      });
      debouncedUpdate();
      dispatch(setMappings(resolver.mappings));
    },
  };
}

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  const helper = useMemo(() => new MappingResolver(), []);

  useEffect(() => {
    helper.reset(mappings, entities, valueMaps);
  }, [helper, mappings, entities, valueMaps]);

  const debouncedUpdate = useDebouncedCallback(
    async () => updateValues(helper.valueMapUpdates()),
    1500,
  );

  return {
    getForEntity: (entityId: string) => {
      const entity = entities?.find((x) => x._id === entityId);
      if (!entity) return [];
      const entityEntries = entity.fields.map((x) => helper.get(entityId, x.key));
      dispatch(setMappings(helper.mappings));
      return entityEntries;
    },
    update: (updatedMappings: Mapping[]) => {
      helper.mappings.map((mapping) => {
        const update = updatedMappings
          .find((x) => x.entityId === mapping.entityId && x.fieldKey === mapping.fieldKey);
        return update ? { ...mapping, value: update.value } : mapping;
      });
      debouncedUpdate();
      dispatch(setMappings(helper.mappings));
    },
  };
}

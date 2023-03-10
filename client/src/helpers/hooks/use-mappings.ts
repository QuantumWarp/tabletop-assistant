import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Mapping } from '../../models/mapping';
import { useGetValueMapsQuery, useGetEntitiesQuery } from '../../store/api';
import { determineMappings, reset, selectMappings } from '../../store/mapping-slice';
import { useAppDispatch } from '../../store/store';

export default function useMappings(emptyMappings: Mapping[]) {
  const dispatch = useAppDispatch();
  const mappings = useSelector(selectMappings(emptyMappings));

  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  if (emptyMappings.length === 0) return [];
  if (!entities || !valueMaps) return [];

  if (!mappings) {
    dispatch(reset({ entities, valueMaps }));
    return [];
  }

  if (mappings.length !== emptyMappings.length) {
    dispatch(determineMappings(emptyMappings));
  }

  return mappings;
}

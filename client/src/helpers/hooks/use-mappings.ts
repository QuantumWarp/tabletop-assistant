import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Mapping } from '../../models/mapping';
import { useGetValueMapsQuery, useGetEntitiesQuery } from '../../store/api';
import { determineMappings, reset, selectMappings } from '../../store/mapping-slice';
import { useAppDispatch } from '../../store/store';

export function useMappings(emptyMappings: Mapping[]) {
  const dispatch = useAppDispatch();
  const mappings = useSelector(selectMappings(emptyMappings), shallowEqual);

  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  useEffect(() => {
    if (!entities || !valueMaps) return;
    dispatch(reset({ entities, valueMaps }));
  }, [dispatch, entities, valueMaps]);

  useEffect(() => {
    if (mappings.length !== emptyMappings.length) {
      dispatch(determineMappings(emptyMappings));
    }
  }, [dispatch, entities, valueMaps]);

  return mappings;
}

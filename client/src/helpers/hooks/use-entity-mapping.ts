import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetValueMapsQuery, useGetEntitiesQuery } from '../../store/api';
import { selectEntries, selectEntityEntries, setEntries } from '../../store/mapping-slice.js';
import { useAppDispatch } from '../../store/store.js';
import MappingHelper from '../mapping.helper.js';

export default function useEntityMapping(entityId: string) {
  const dispatch = useAppDispatch();

  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  const entries = useSelector(selectEntries);
  const entry = useSelector(selectEntityEntries(entityId));

  useEffect(() => {
    if (entry) return;
    if (!entities || !valueMaps) return;
    const helper = new MappingHelper(entries, entities, valueMaps);
    helper.get(entityId, fieldKey);
    dispatch(setEntries(helper.entries));
  }, [entry, entries, entities, valueMaps, entityId, fieldKey, dispatch]);

  const updateEntries = () => {

  };

  return [entries, updateEntries];
}

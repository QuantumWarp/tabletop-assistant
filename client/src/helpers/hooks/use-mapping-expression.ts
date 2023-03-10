import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Expression, ExpressionVariable } from 'tabletop-assistant-common';
import { useGetValueMapsQuery, useGetEntitiesQuery } from '../../store/api';
import { determineMappings, selectExpressions } from '../../store/mapping-slice.js';
import { useAppDispatch } from '../../store/store';

export default function useMappingExpressions(expressions: Expression[]) {
  const dispatch = useAppDispatch();
  const results = useSelector(selectExpressions(expressions));

  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  if (!entities || !valueMaps) return [];

  if (results.length !== expressions.length) {
    const allVariables = expressions.reduce(
      (arr, x) => ([...arr, ...x.variables]),
      ([] as ExpressionVariable[]),
    );
    const emptyMappings = allVariables.map((x) => ({ ...x, value: undefined }));
    dispatch(determineMappings(emptyMappings));
  }

  return results;
}

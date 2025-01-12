import { useParams } from 'react-router-dom';
import { useCreateValueMapMutation, useGetEntityQuery, useGetValueMapsQuery } from '../../store/api';
import { useEffect } from 'react';
import { Expression, ValueMap } from '@tabletop-assistant/common';
import { parser } from 'mathjs';

const compute = (expression: Expression, selfEntityId: string, valueMaps: ValueMap[]): string | number | boolean | undefined => {
  const parse = parser();

  for (const variable of expression.variables) {
    const variableEntityId = variable.entityId === '-' ? selfEntityId : variable.entityId;
    const mapping = valueMaps.find(
      (x) => x.entityId === variableEntityId && x.fieldKey === variable.fieldKey,
    );
    if (mapping?.value === undefined) return undefined;
    parse.set(variable.key, mapping.value || 0);
  }

  return parse.evaluate(expression.expression);
};

export function useMappingEntity(entityId: string) {
  const { tabletopId } = useParams() as { tabletopId: string };

  const { data: entity } = useGetEntityQuery(entityId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [createValueMap] = useCreateValueMapMutation();

  const computedFields = entity?.fields.filter((x) => x.computed);
  const nonComputedFields = entity?.fields.filter((x) => !x.computed);

  useEffect(() => {
    if (!nonComputedFields) return;
    if (!valueMaps) return;

    for (const field of nonComputedFields) {
      const valueMap = valueMaps.find((x) => x.fieldKey === field.key);
      if (!valueMap) {
        createValueMap({ entityId, fieldKey: field.key, tabletopId, value: field.initial });
      }
    }
  }, [valueMaps]);

  const computedValueMaps = (valueMaps && computedFields) ? computedFields.map((x) => {
    return <ValueMap>{
      entityId: entityId,
      fieldKey: x.key,
      value: compute(x.computed!, entityId, valueMaps),
    };
  }) : [];

  return (valueMaps || []).filter((x) => x.entityId === entityId).concat(computedValueMaps);
}

import { parser } from 'mathjs';
import { Expression, ValueMap } from '@tabletop-assistant/common';
import { useGetValueMapsQuery } from '../../store/api';
import { useParams } from 'react-router-dom';

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

export function useMappingExpressions(expressions: Expression[], selfEntityId: string) {
  const { tabletopId } = useParams() as { tabletopId: string };

  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  const results = expressions.map((x) => ({
    expression: x,
    result: compute(x, selfEntityId, valueMaps || []),
  }));

  return results;
}

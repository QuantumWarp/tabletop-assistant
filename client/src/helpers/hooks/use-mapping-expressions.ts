import { parser } from 'mathjs';
import { Expression, ExpressionVariable } from 'tabletop-assistant-common';
import { Mapping } from '../../models/mapping';
import { useMappings } from './use-mappings';

const compute = (expression: Expression, mappings: Mapping[]): any => {
  const parse = parser();

  // eslint-disable-next-line no-restricted-syntax
  for (const variable of expression.variables) {
    const mapping = mappings.find(
      (x) => x.entityId === variable.entityId && x.fieldKey === variable.fieldKey,
    );
    if (mapping?.value === undefined) return undefined;
    parse.set(variable.key, mapping.value || 0);
  }

  return parse.evaluate(expression.expression);
};

export function useMappingExpressions(expressions: Expression[]) {
  const allVariables = expressions.reduce(
    (arr, x) => ([...arr, ...x.variables]),
    ([] as ExpressionVariable[]),
  );
  const emptyMappings = allVariables.map((x) => ({ ...x, value: undefined }));

  const mappings = useMappings(emptyMappings);
  if (!mappings) return undefined;

  const results = expressions.map((x) => ({
    expression: x,
    result: compute(x, mappings),
  }));

  return results;
}

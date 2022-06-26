import {
  Entity, EntityField, Values,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import DisplayHelper from './display.helper';

export default class ExpressionHelper {
  static calculateComputedValues(values: Values[], entities: Entity[]): Values[] {
    let computedValues = values.map((x) => ({ ...x, mappings: { ...x.mappings } }));

    entities.forEach((entity) => {
      const entityValues = computedValues.find((x) => x.entityId === entity._id);
      const computedFields = entity.fields.filter((x) => Boolean(x.computed));
      if (!entityValues) return;

      computedFields.forEach((field) => {
        if (entityValues.mappings[field.key] !== undefined) return;
        computedValues = ExpressionHelper.calculateComputedField(
          entity, field, computedValues, entities,
        );
      });
    });

    return computedValues;
  }

  static calculateComputedField(
    entity: Entity, field: EntityField, values: Values[], entities: Entity[],
  ): Values[] {
    if (!field.computed) return values;
    let newValues = values;
    const parse = parser();

    const variables = Object.keys(field.computed.variables);
    // eslint-disable-next-line no-restricted-syntax
    for (const variable of variables) {
      const entityRef = field.computed.variables[variable];

      const unfilledMappings = newValues
        .find((x) => x.entityId === entityRef.entityId)
        ?.mappings;
      const filledFieldMappings = DisplayHelper.getFieldMappings(entity, unfilledMappings);
      let value = filledFieldMappings[entityRef.fieldKey];

      if (!value) {
        const varEntity = entities.find((x) => x._id === entityRef.entityId);
        const varField = varEntity?.fields.find((x) => x.key === entityRef.fieldKey);
        if (!varEntity || !varField || !varField.computed) return newValues;

        newValues = ExpressionHelper.calculateComputedField(varEntity, varField, values, entities);
        value = newValues
          .find((x) => x.entityId === entityRef.entityId)
          ?.mappings[entityRef.fieldKey];
      }

      if (!value) {
        return newValues;
      }

      parse.set(variable, value);
    }

    const newValue = parse.evaluate(field.computed.expression);
    const entityValues = newValues.find((x) => x.entityId === entity._id);
    if (!entityValues) return newValues;

    entityValues.mappings[field.key] = newValue;
    return newValues;
  }
}

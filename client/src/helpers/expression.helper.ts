import {
  Entity, EntityField, Expression, Macro, Values,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import DisplayHelper from './display.helper';
import { ResolvedMacro } from '../models/resolved-macro';

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

  static calculateExpression(
    expression: Expression, values: Values[], entities: Entity[],
  ): any | undefined {
    let newValues = values;
    const parse = parser();

    const variables = Object.keys(expression.variables);
    // eslint-disable-next-line no-restricted-syntax
    for (const variable of variables) {
      const entityRef = expression.variables[variable];

      const varEntity = entities.find((x) => x._id === entityRef.entityId);
      const varField = varEntity?.fields.find((x) => x.key === entityRef.fieldKey);

      if (varEntity && varField && varField.computed) {
        newValues = ExpressionHelper.calculateComputedField(varEntity, varField, values, entities);
      }

      const value = newValues
        .find((x) => x.entityId === entityRef.entityId)
        ?.mappings[entityRef.fieldKey];

      if (!value) return undefined;

      parse.set(variable, value);
    }

    return parse.evaluate(expression.expression);
  }

  static resolveMacros(
    macros: Macro[], values: Values[], entities: Entity[],
  ): ResolvedMacro[] {
    const computedValues = values.map((x) => ({ ...x, mappings: { ...x.mappings } }));
    return macros.map((x) => ExpressionHelper.resolveMacro(x, computedValues, entities));
  }

  static resolveMacro(
    macro: Macro, computedValues: Values[], entities: Entity[],
  ): ResolvedMacro {
    const entity = entities.find((x) => x._id === macro.target.entityId);
    const field = entity?.fields.find((x) => x.key === macro.target.fieldKey);

    return {
      macro,
      result: ExpressionHelper.calculateExpression(macro.expression, computedValues, entities),
      entity: entity as Entity,
      field: field as EntityField,
    };
  }

  static updateMacroValues(
    macros: ResolvedMacro[], values: Values[],
  ): Values[] {
    const entityIds = macros.map((x) => x.entity._id);
    const updateValues = values
      .filter((x) => entityIds.includes(x.entityId))
      .map((x) => ({ ...x, mappings: { ...x.mappings } }));

    macros.forEach((macro) => {
      const entityVals = updateValues.find((x) => x.entityId === macro.entity._id);
      if (entityVals) {
        entityVals.mappings[macro.field.key] = macro.result;
      }
    });

    return updateValues;
  }
}

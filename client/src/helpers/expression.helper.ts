import {
  Entity, EntityField, Expression, Macro, ValueMap,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import DisplayHelper from './display.helper';
import { ResolvedMacro } from '../models/resolved-macro';

export default class ExpressionHelper {
  static calculateComputedValues(valueMaps: ValueMap[], entities: Entity[]): ValueMap[] {
    let computedValues: ValueMap[] = valueMaps.map((x) => ({ ...x, mappings: [...x.mappings] }));

    entities.forEach((entity) => {
      const entityValues = computedValues.find((x) => x.entityId === entity._id);
      const computedFields = entity.fields.filter((x) => Boolean(x.computed));
      if (!entityValues) return;

      computedFields.forEach((field) => {
        const mapping = entityValues.mappings.find((x) => x.fieldKey === field.key);
        if (mapping?.value !== undefined) return;
        computedValues = ExpressionHelper.calculateComputedField(
          entity, field, computedValues, entities,
        );
      });
    });

    return computedValues;
  }

  static calculateComputedField(
    entity: Entity, field: EntityField, valueMaps: ValueMap[], entities: Entity[],
  ): ValueMap[] {
    if (!field.computed) return valueMaps;
    let newValues = valueMaps;
    const parse = parser();

    // eslint-disable-next-line no-restricted-syntax
    for (const variable of field.computed.variables) {
      const unfilledMappings = newValues
        .find((x) => x.entityId === variable?.entityId)
        ?.mappings;
      const filledFieldMappings = DisplayHelper.getFieldMappings(entity, unfilledMappings);
      let value = filledFieldMappings.find((x) => x.fieldKey === variable?.fieldKey)?.value;

      if (!value) {
        const varEntity = entities.find((x) => x._id === variable?.entityId);
        const varField = varEntity?.fields.find((x) => x.key === variable?.fieldKey);
        if (!varEntity || !varField || !varField.computed) return newValues;

        newValues = ExpressionHelper
          .calculateComputedField(varEntity, varField, valueMaps, entities);
        value = newValues
          .find((x) => x.entityId === variable?.entityId)
          ?.mappings.find((x) => x.fieldKey === variable?.fieldKey)?.value;
      }

      if (!value) {
        return newValues;
      }

      parse.set(variable.key, value);
    }

    const newValue = parse.evaluate(field.computed.expression);
    const entityValues = newValues.find((x) => x.entityId === entity._id);
    if (!entityValues) {
      return newValues;
    }

    const mapping = entityValues.mappings.find((x) => x.fieldKey === field.key);

    if (mapping) {
      mapping.value = newValue;
    } else {
      entityValues.mappings.push({
        fieldKey: field.key,
        value: newValue,
      });
    }

    return newValues;
  }

  static calculateExpression(
    expression: Expression, valueMaps: ValueMap[], entities: Entity[],
  ): any | undefined {
    let newValues = valueMaps;
    const parse = parser();

    // eslint-disable-next-line no-restricted-syntax
    for (const variable of expression.variables) {
      const varEntity = entities.find((x) => x._id === variable.entityId);
      const varField = varEntity?.fields.find((x) => x.key === variable.fieldKey);

      if (varEntity && varField && varField.computed) {
        newValues = ExpressionHelper
          .calculateComputedField(varEntity, varField, valueMaps, entities);
      }

      const value = newValues
        .find((x) => x.entityId === variable.entityId)
        ?.mappings.find((x) => x.fieldKey === variable?.fieldKey)?.value;

      if (!value) return undefined;

      parse.set(variable.key, value);
    }

    return parse.evaluate(expression.expression);
  }

  static resolveMacros(
    macros: Macro[], valueMaps: ValueMap[], entities: Entity[],
  ): ResolvedMacro[] {
    const computedValues: ValueMap[] = valueMaps.map((x) => ({ ...x, mappings: [...x.mappings] }));
    return macros.map((x) => ExpressionHelper.resolveMacro(x, computedValues, entities));
  }

  static resolveMacro(
    macro: Macro, computedValues: ValueMap[], entities: Entity[],
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
    macros: ResolvedMacro[], valueMaps: ValueMap[],
  ): ValueMap[] {
    const entityIds = macros.map((x) => x.entity._id);
    const updateValues = valueMaps
      .filter((x) => entityIds.includes(x.entityId))
      .map((x) => ({ ...x, mappings: [...x.mappings] }));

    macros.forEach((macro) => {
      const entityVals = updateValues.find((x) => x.entityId === macro.entity._id);
      const mapping = entityVals?.mappings.find((x) => x.fieldKey === macro.field.key);
      if (mapping) {
        mapping.value = macro.result;
      }
    });

    return updateValues;
  }
}

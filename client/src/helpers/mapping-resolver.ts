import {
  Entity, EntityField, Expression, ValueMap,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import { Mapping } from '../models/mapping';
import FieldHelper from './field.helper';

export default class MappingResolver {
  private newMappings: Mapping[] = [];

  constructor(
    private mappings: Mapping[],
    private valueMaps: ValueMap[],
    private entities: Entity[],
  ) {}

  resolve(emptyMappings: Mapping[]): Mapping[] {
    emptyMappings.forEach((x) => this.resolveMapping(x.entityId, x.fieldKey));
    return this.newMappings;
  }

  private resolveMapping(entityId: string, fieldKey: string): Mapping {
    let mapping = this.mappings.find((x) => x.entityId === entityId && x.fieldKey === fieldKey);

    if (!mapping) {
      const value = this.determineValue(entityId, fieldKey);
      mapping = { entityId, fieldKey, value };
      this.newMappings.push(mapping);
    }

    return mapping;
  }

  private compute(expression: Expression): any {
    const parse = parser();

    expression.variables.forEach((variable) => {
      const mapping = this.resolveMapping(variable.entityId, variable.fieldKey);
      parse.set(variable.key, mapping.value || 0);
    });

    return parse.evaluate(expression.expression);
  }

  private determineValue(entityId: string, fieldKey: string): any {
    const { field, mapping } = this.resolveObjects(entityId, fieldKey);

    if (!field) {
      return undefined;
    }

    if (field.computed) {
      return this.compute(field.computed);
    }

    if (mapping) {
      return mapping.value;
    }

    if (field.initial) {
      return field.initial;
    }

    return this.defaultValue(field);
  }

  private resolveObjects(entityId: string, fieldKey: string) {
    const entity = this.entities.find((x) => x._id === entityId);
    const field = entity && FieldHelper.getFields(entity).find((x) => x.key === fieldKey);

    const valueMap = this.valueMaps.find((x) => x.entityId === entityId);
    const mapping = valueMap?.mappings.find((x) => x.fieldKey === fieldKey);

    return { field, mapping };
  }

  private defaultValue(field: EntityField) {
    switch (field.type) {
      case 'boolean': return false;
      case 'number': return 0;
      default: return '';
    }
  }
}

import {
  Entity, EntityField, Expression, ValueMap,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import { EmptyMapping, Mapping, mappingsMatch } from '../models/mapping';
import FieldHelper from './field.helper';

export default class MappingResolver {
  newMappings: Mapping[] = [];

  newInvalidators: { mapping: Mapping, invalidate: Mapping }[] = [];

  constructor(
    private mappings: Mapping[],
    private valueMaps: ValueMap[],
    private entities: Entity[],
  ) {}

  resolve(emptyMappings: EmptyMapping[]): void {
    emptyMappings.forEach((x) => this.resolveMapping(x));
  }

  private resolveMapping(emptyMapping: EmptyMapping): Mapping {
    let mapping = this.mappings
      .concat(this.newMappings)
      .find((x) => mappingsMatch(emptyMapping, x));

    if (!mapping) {
      mapping = { ...emptyMapping, value: undefined };
      mapping.value = this.determineValue(mapping);
      this.newMappings.push(mapping);
    }

    return mapping;
  }

  private compute(expression: Expression, forMapping: Mapping): any {
    const parse = parser();

    expression.variables.forEach((variable) => {
      const entityId = variable.entityId === '-' ? forMapping.entityId : variable.entityId;
      const { fieldKey } = variable;

      const mapping = this.resolveMapping({ entityId, fieldKey });
      parse.set(variable.key, mapping.value || 0);

      this.newInvalidators.push({ mapping, invalidate: forMapping });
    });

    return parse.evaluate(expression.expression);
  }

  private determineValue(mapping: Mapping): any {
    const { field, value } = this.resolveObjects(mapping);

    if (!field) {
      return undefined;
    }

    if (field.computed) {
      return this.compute(field.computed, mapping);
    }

    if (value) {
      return value;
    }

    if (field.initial) {
      return field.initial;
    }

    return this.defaultValue(field);
  }

  private resolveObjects(mapping: EmptyMapping) {
    const entity = this.entities.find((x) => x._id === mapping.entityId);
    const field = entity && FieldHelper.getFields(entity).find((x) => x.key === mapping.fieldKey);

    const valueMap = this.valueMaps.find((x) => x.entityId === mapping.entityId);
    const value = valueMap?.mappings.find((x) => x.fieldKey === mapping.fieldKey)?.value;

    return { field, value };
  }

  private defaultValue(field: EntityField) {
    switch (field.type) {
      case 'boolean': return false;
      case 'number': return 0;
      default: return '';
    }
  }
}

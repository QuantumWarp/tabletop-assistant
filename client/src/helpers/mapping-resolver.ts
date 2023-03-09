import {
  Entity, EntityField, Expression, ValueMap,
} from 'tabletop-assistant-common';
import { parser } from 'mathjs';
import { Mapping } from '../models/mapping';

export default class MappingResolver {
  private entities: Entity[] = [];

  private valueMaps: ValueMap[] = [];

  mappings: Mapping[] = [];

  reset(mappings?: Mapping[], entities?: Entity[], valueMaps?: ValueMap[]) {
    this.mappings = mappings || [];
    this.entities = entities || [];
    this.valueMaps = valueMaps || [];
  }

  get(entityId: string, fieldKey: string): Mapping {
    let mapping = this.mappings.find((x) => x.entityId === entityId && x.fieldKey === fieldKey);

    if (!mapping) {
      const value = this.determineValue(entityId, fieldKey);
      mapping = { entityId, fieldKey, value };

      if (value !== undefined) {
        this.mappings.push(mapping);
      }
    }

    return mapping;
  }

  compute(expression: Expression): any {
    const parse = parser();

    expression.variables.forEach((variable) => {
      const mapping = this.get(variable.entityId, variable.fieldKey);
      parse.set(variable.key, mapping.value || 0);
    });

    return parse.evaluate(expression.expression);
  }

  valueMapUpdates(): ValueMap[] {
    return []; // TODO
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
    const field = entity?.fields.find((x) => x.key === fieldKey);

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

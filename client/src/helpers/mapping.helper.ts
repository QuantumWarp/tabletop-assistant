import { Entity, EntityField, ValueMap } from 'tabletop-assistant-common';
import { parser } from 'mathjs';

export default class MappingHelper {
  constructor(
    public entries: EntityFieldValue[],
    private entities: Entity[],
    private valueMaps: ValueMap[],
  ) { }

  get(entityId: string, fieldKey: string): any {
    let entry = this.entries.find((x) => x.entityId === entityId && x.fieldKey === fieldKey);

    if (!entry) {
      const value = this.determineValue(entityId, fieldKey);
      entry = { entityId, fieldKey, value };

      if (value !== undefined) {
        this.entries.push(entry);
      }
    }

    return entry;
  }

  private determineValue(entityId: string, fieldKey: string): any {
    const { field, mapping } = this.resolveObjects(entityId, fieldKey);

    if (!field) {
      return undefined;
    }

    if (field.computed) {
      return this.computeField(field);
    }

    if (mapping) {
      return mapping.value;
    }

    if (field.initial) {
      return field.initial;
    }

    return this.defaultValue(field);
  }

  private computeField(field: EntityField): any {
    const parse = parser();

    field.computed!.variables.forEach((variable) => {
      const value = this.get(variable.entityId, variable.fieldKey) || 0;
      parse.set(variable.key, value);
    });

    return parse.evaluate(field.computed!.expression);
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

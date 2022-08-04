import { Types } from 'mongoose';
import FieldHelper from 'tabletop-assistant-client/src/helpers/field.helper';
import { Expression, ExpressionVariable, SlotFieldMapping } from 'tabletop-assistant-common';
import { Templated, TemplatedEntity, TemplatedLayout } from './templated.types';

export default class TemplateHelper {
  static create(template: Omit<Templated, '_id'>): Templated {
    return {
      _id: new Types.ObjectId().toString(),
      ...template,
    };
  }

  static createLayout(template: Omit<TemplatedLayout, '_id'>): TemplatedLayout {
    return {
      _id: new Types.ObjectId().toString(),
      ...template,
    };
  }

  static createEntity(template: Omit<TemplatedEntity, '_id'>): TemplatedEntity {
    return {
      _id: new Types.ObjectId().toString(),
      ...template,
    };
  }

  static keyName(name: string) {
    return {
      key: FieldHelper.createKey(name),
      name,
    };
  }

  static variable(key: string, entity: TemplatedEntity, fieldKey: string): ExpressionVariable {
    return {
      key,
      entityId: entity._id,
      fieldKey,
    };
  }

  static selfVariable(key: string, fieldKey: string): ExpressionVariable {
    return {
      key,
      entityId: '-',
      fieldKey,
    };
  }

  static singleVariable(key: string, entity: TemplatedEntity, fieldKey: string): Expression {
    return {
      expression: key,
      variables: [TemplateHelper.variable(key, entity, fieldKey)],
    };
  }

  static slotMap(slotKey: string, fieldKey: string): SlotFieldMapping {
    return {
      slotKey,
      fieldKey,
    };
  }
}

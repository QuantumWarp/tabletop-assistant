import { Types } from 'mongoose';
import FieldHelper from 'tabletop-assistant-client/src/helpers/field.helper';
import { ExpressionVariable, SlotFieldMapping } from 'tabletop-assistant-common';
import { TemplatedEntity } from './templated.types';

export default class TemplateHelper {
  static create(template: Omit<TemplatedEntity, '_id'>): TemplatedEntity {
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

  static slotMap(slotKey: string, fieldKey: string): SlotFieldMapping {
    return {
      slotKey,
      fieldKey,
    };
  }
}

import { Types } from 'mongoose';
import FieldHelper from 'tabletop-assistant-client/src/helpers/field.helper';
import {
  Expression,
  ExpressionVariable,
  SlotFieldMapping,
  CreateLayout,
  CreateTemplateRoot,
  CreateTemplateGroup,
  CreateEntity,
} from '@/common';

type TemplateType = CreateTemplateRoot
| CreateTemplateGroup
| CreateLayout
| CreateEntity;

export default class TemplateHelper {
  static create<T extends TemplateType>(template: Omit<T, 'referencedEntityIds'>): Omit<T, 'referencedEntityIds'> & { _id: string } {
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

  static variable(key: string, entity: Omit<CreateEntity, 'referencedEntityIds'> & { _id: string; }, fieldKey: string): ExpressionVariable {
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

  static singleVariable(key: string, entity: Omit<CreateEntity, 'referencedEntityIds'> & { _id: string; }, fieldKey: string): Expression {
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

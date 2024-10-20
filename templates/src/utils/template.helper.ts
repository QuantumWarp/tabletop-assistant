import {
  Expression,
  ExpressionVariable,
  SlotFieldMapping,
  CreateLayout,
  CreateEntity,
} from '@tabletop-assistant/common';

type TemplateType =
| CreateLayout
| CreateEntity;

export default class TemplateHelper {
  static create<T extends TemplateType>(template: Omit<T, 'referencedEntityIds'>): Omit<T, 'referencedEntityIds'> & { id: string } {
    return {
      id: Math.random().toString(),
      ...template,
    };
  }

  static keyName(name: string) {
    const replacedName = name
      .replace(/[^a-zA-Z0-9]/g, '');
    const lcName = replacedName.charAt(0).toLowerCase() + replacedName.slice(1);
    const key = (lcName.match(/^\d/) ? '_' : '') + lcName;
    return {
      key,
      name,
    };
  }

  static variable(key: string, entity: Omit<CreateEntity, 'referencedEntityIds'> & { id: string; }, fieldKey: string): ExpressionVariable {
    return {
      key,
      entityId: entity.id,
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

  static singleVariable(key: string, entity: Omit<CreateEntity, 'referencedEntityIds'> & { id: string; }, fieldKey: string): Expression {
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

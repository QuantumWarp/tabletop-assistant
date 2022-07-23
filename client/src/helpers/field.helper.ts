import { CreateEntity, EntityField } from 'tabletop-assistant-common';
import FieldType from '../models/field.type';

export default class FieldHelper {
  static displayName(type: FieldType): string {
    switch (type) {
      case FieldType.String: return 'Text';
      case FieldType.Boolean: return 'True or False';
      case FieldType.Number: return 'Number';
      case FieldType.Computed: return 'Computed';
      default: throw new Error('Invalid field type');
    }
  }

  static getFields(entity: CreateEntity): EntityField[] {
    return entity.fields.concat([{
      key: '_name',
      name: 'Name (Info)',
      type: 'string',
      initial: entity.name,
    },
    ...(entity.icon ? [{
      key: '_icon',
      name: 'Icon (Info)',
      type: 'string',
      initial: entity.icon,
    }] : []),
    ...(entity.description ? [{
      key: '_description',
      name: 'Description (Info)',
      type: 'string',
      initial: entity.description,
    }] : [])]);
  }

  static createKey(name: string) {
    const replacedName = name
      .replace(/[^a-zA-Z0-9]/g, '');
    const lcName = replacedName.charAt(0).toLowerCase() + replacedName.slice(1);
    return (lcName.match(/^\d/) ? '_' : '') + lcName;
  }

  static list(): FieldType[] {
    return Object.values(FieldType);
  }
}

import FieldType from './field.type';

export default class FieldHelper {
  static displayName(type: FieldType): string {
    switch (type) {
      case FieldType.String: return 'Text';
      case FieldType.Boolean: return 'True or False';
      case FieldType.Number: return 'Number';
      default: throw new Error('Invalid field type');
    }
  }

  static list(): FieldType[] {
    return Object.values(FieldType);
  }
}

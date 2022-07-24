import FieldHelper from 'tabletop-assistant-client/src/helpers/field.helper';
import { EntityFieldRef } from 'tabletop-assistant-common';
import { TemplatedEntity } from './templated.types';

export default class TemplateHelper {
  static keyName(name: string) {
    return {
      key: FieldHelper.createKey(name),
      name,
    };
  }

  static entityFieldRef(entity: TemplatedEntity, fieldKey: string): EntityFieldRef {
    return {
      entityId: entity._id,
      fieldKey,
    };
  }
}

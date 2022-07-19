import { Entity, EntityField, Macro } from 'tabletop-assistant-common';

export interface ResolvedMacro {
  macro: Macro;
  result: any;
  entity: Entity;
  field: EntityField;
}

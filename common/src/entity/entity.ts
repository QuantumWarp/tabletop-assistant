import { Expression, Macro } from './expression';
import { RollCombo } from './roll';

export interface Entity {
  readonly id: string;
  readonly isTemplate?: boolean;

  name: string;
  tags: string[];
  description?: string;
  icon?: string;
  imageUrl?: string;

  fields: EntityField[];
  actions: EntityAction[];
  displays: EntityDisplay[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateEntity = Omit<Entity, 'createdAt' | 'updatedAt'>;
export type CreateEntity = Omit<UpdateEntity, 'id'>;

export interface EntityField {
  key: string;
  name: string;
  type: EntityFieldType;
  initial?: string | number | boolean;
  computed?: Expression;
  static?: boolean;
  prefix?: string;
  postfix?: string;
}

export type EntityFieldType
  = 'string'
  | 'boolean'
  | 'number'
  | 'computed';

export interface EntityAction {
  key: string;
  name: string;
  roll?: RollCombo;
  macros?: Macro[],
  triggers: EntityActionTrigger[];
}

export interface EntityActionTrigger {
  manual?: boolean;
  sibling?: boolean;
  entityId?: string;
  actionKey?: string;
}

export interface EntityDisplay {
  key: string;
  name: string;
  type: EntityDisplayType;
  default?: boolean;
  mappings: SlotFieldMapping[];
}

export interface SlotFieldMapping {
  slotKey: string;
  fieldKey: string;
}

export type EntityDisplayType
  = 'dots'
  | 'square'
  | 'card'
  | 'toggle';

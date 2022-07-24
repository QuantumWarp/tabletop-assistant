import { Expression, Macro } from './expression';
import { RollCombo } from './roll';

export interface Entity {
  readonly _id: string;
  readonly userId: string;
  readonly tabletopId: string;
  readonly templateId?: string;

  name: string;
  tags: string[];
  description?: string;
  icon?: string;

  fields: EntityField[];
  actions: EntityAction[];
  displays: EntityDisplay[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateEntity = Omit<Entity, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateEntity = Omit<UpdateEntity, '_id'>;

export interface EntityField {
  key: string;
  name: string;
  type: EntityFieldType;
  initial?: any;
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
  mappings: {
    [slot: string]: string;
  };
}

export type EntityDisplayType
  = 'dot'
  | 'square'
  | 'card'
  | 'toggle';

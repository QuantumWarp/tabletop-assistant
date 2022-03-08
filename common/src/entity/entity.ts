export interface Entity {
  readonly _id: string;
  readonly userId: string;

  name: string;
  group?: string;
  description?: string;
  icon?: string;

  fields: EntityField[];
  actions: EntityAction[];
  layouts: EntityLayout[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type EntityUpdate = Omit<Entity, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type EntityCreate = Omit<EntityUpdate, '_id'>;

export interface EntityField {
  key: string;
  name: string;
  type: 'number' | 'string' | 'boolean';
  postfix?: string;
}

export interface EntityAction {
  key: string;
  name: string;
  roll?: string;
  triggers: [];
}

export interface EntityActionTrigger {
  manual: boolean;
  sibling: boolean;
  action?: {
    entityId: string;
    actionKey: string;
  };
}

export interface EntityLayout {
  layoutType: string;
  default: boolean;

  slotMap: {
    [slot: string]: string
  };
}

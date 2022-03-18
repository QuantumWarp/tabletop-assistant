export interface Entity {
  readonly _id: string;
  readonly userId: string;

  tabletopId: string;
  name: string;
  group?: string;
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
  type: string;
  postfix?: string;
}

export interface EntityAction {
  key: string;
  name: string;
  roll?: string;
  triggers: EntityActionTrigger[];
}

export interface EntityActionTrigger {
  manual: boolean;
  sibling: boolean;
  action?: {
    entityId: string;
    actionKey: string;
  };
}

export interface EntityDisplay {
  type: string;
  default: boolean;
  mappings: {
    [slot: string]: string
  };
}

export interface EntityValues {
  readonly _id: string;
  readonly userId: string;

  entityId: string;

  fieldMap: {
    [field: string]: any
  };

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type EntityValuesUpdate = Omit<EntityValues, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type EntityValuesCreate = Omit<EntityValuesUpdate, '_id'>;

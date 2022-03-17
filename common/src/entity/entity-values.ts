export interface EntityValues {
  readonly _id: string;
  readonly userId: string;
  readonly entityId: string;

  fieldMap: {
    [field: string]: any
  };

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateEntityValues = Omit<EntityValues, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateEntityValues = Omit<UpdateEntityValues, '_id'>;

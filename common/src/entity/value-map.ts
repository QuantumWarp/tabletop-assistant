export interface ValueMap {
  readonly _id: string;
  readonly userId: string;
  readonly tabletopId: string;
  readonly entityId: string;

  mappings: {
    [field: string]: any;
  };

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateValueMap = Omit<ValueMap, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateValueMap = Omit<UpdateValueMap, '_id'>;

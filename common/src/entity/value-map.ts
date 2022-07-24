export interface ValueMap {
  readonly _id: string;
  readonly userId: string;
  readonly tabletopId: string;
  readonly entityId: string;

  mappings: FieldValueMapping[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export interface FieldValueMapping {
  fieldKey: string;
  value: any;
}

export type UpdateValueMap = Omit<ValueMap, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateValueMap = Omit<UpdateValueMap, '_id'>;

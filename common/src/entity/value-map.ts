export interface ValueMap {
  readonly id: string;
  readonly tabletopId: string;
  readonly entityId: string;

  mappings: FieldValueMapping[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface FieldValueMapping {
  fieldKey: string;
  value: string | number | boolean | undefined;
}

export type UpdateValueMap = Omit<ValueMap, 'createdAt' | 'updatedAt'>;
export type CreateValueMap = Omit<UpdateValueMap, 'id'>;

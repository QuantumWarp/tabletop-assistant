export interface ValueMap {
  readonly id: string;
  readonly tabletopId: string;
  readonly entityId: string;
  readonly fieldKey: string;

  value: string | number | boolean | undefined;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateValueMap = Omit<ValueMap, 'createdAt' | 'updatedAt'>;
export type CreateValueMap = Omit<UpdateValueMap, 'id'>;

export interface Values {
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

export type UpdateValues = Omit<Values, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateValues = Omit<UpdateValues, '_id'>;

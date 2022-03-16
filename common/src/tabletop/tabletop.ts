export interface Tabletop {
  readonly _id: string;
  readonly userId: string;

  name: string;
  shortName: string;
  description?: string;
  imageUrl?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateTabletop = Omit<Tabletop, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTabletop = Omit<UpdateTabletop, '_id'>;

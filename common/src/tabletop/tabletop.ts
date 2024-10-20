export interface Tabletop {
  readonly id: string;

  name: string;
  shortName: string;
  description?: string;
  imageUrl?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateTabletop = Omit<Tabletop, 'createdAt' | 'updatedAt'>;
export type CreateTabletop = Omit<UpdateTabletop, 'id'>;

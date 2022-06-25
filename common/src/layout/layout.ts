export interface Layout {
  readonly _id: string;
  readonly userId: string;
  readonly tabletopId: string;
  readonly templateId?: string;

  order: number;
  name: string;
  hidden: boolean;
  entries: LayoutEntry[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateLayout = Omit<Layout, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateLayout = Omit<UpdateLayout, '_id'>;

export interface LayoutEntry {
  entityId: string;
  displayKey: string;

  position: LayoutPosition;
  size: LayoutSize;
}

export interface LayoutPosition {
  left: number;
  top: number;
}

export interface LayoutSize {
  width: number;
  height: number;
}

export type UpdateLayoutOrder = string[];

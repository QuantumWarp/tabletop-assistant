export interface Layout {
  readonly id: string;
  readonly tabletopId?: string;
  readonly isTemplate?: boolean;

  order: number;
  name: string;
  hidden: boolean;
  entries: LayoutEntry[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateLayout = Omit<Layout, 'createdAt' | 'updatedAt'>;
export type CreateLayout = Omit<UpdateLayout, 'id'>;

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

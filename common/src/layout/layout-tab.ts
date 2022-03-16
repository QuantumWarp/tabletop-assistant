import { LayoutType } from './layout-type';

export interface LayoutTab {
  readonly _id: string;
  readonly userId: string;

  name: string;
  entries: LayoutEntry[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateLayoutTab = Omit<LayoutTab, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateLayoutTab = Omit<UpdateLayoutTab, '_id'>;

export interface LayoutEntry {
  entityId: string;
  layoutType: LayoutType;

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

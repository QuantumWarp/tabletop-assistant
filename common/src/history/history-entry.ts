export interface HistoryEntry {
  readonly _id: string;
  readonly userId: string;
  readonly tabletopId: string;

  name: string;
  description?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateHistoryEntry = Omit<HistoryEntry, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateHistoryEntry = Omit<UpdateHistoryEntry, '_id'>;

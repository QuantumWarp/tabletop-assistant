export interface HistoryEntry {
  readonly _id: string;
  readonly userId: string;

  name: string;
  description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type HistoryEntryUpdate = Omit<HistoryEntry, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type HistoryEntryCreate = Omit<HistoryEntryUpdate, '_id'>;

export interface HistoryEntry {
  readonly id: string;
  readonly tabletopId: string;

  name: string;
  description?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateHistoryEntry = Omit<HistoryEntry, 'createdAt' | 'updatedAt'>;
export type CreateHistoryEntry = Omit<UpdateHistoryEntry, 'id'>;

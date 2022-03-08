export interface Note {
  readonly _id: string;
  readonly userId: string;

  name: string;
  subtitle: string;
  description: string;
  imageUrl?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type NoteUpdate = Omit<Note, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type NoteCreate = Omit<NoteUpdate, '_id'>;

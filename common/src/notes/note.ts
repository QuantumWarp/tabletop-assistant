export interface Note {
  readonly id: string;
  readonly tabletopId: string;

  name: string;
  subtitle: string;
  description?: string;
  imageId?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateNote = Omit<Note, 'createdAt' | 'updatedAt'>;
export type CreateNote = Omit<UpdateNote, 'id'>;

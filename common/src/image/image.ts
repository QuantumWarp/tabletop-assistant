export interface Image {
  readonly id: string;

  blob: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UpdateImage = Omit<Image, 'createdAt' | 'updatedAt'>;
export type CreateImage = Omit<UpdateImage, 'id'>;

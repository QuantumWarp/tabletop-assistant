export interface TemplateRoot {
  readonly _id: string;

  name: string;
  description: string;
  imageUrl: string;
  tags: string[];

  templateGroupIds: string[];
  templateLayoutIds: string[];
  templateEntityIds: string[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateTemplateRoot = Omit<TemplateRoot, | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplateRoot = Omit<UpdateTemplateRoot, '_id'>;
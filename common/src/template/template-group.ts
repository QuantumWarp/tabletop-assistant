export interface TemplateGroup {
  readonly _id: string;

  name: string;
  description: string;
  imageUrl: string;

  templateLayoutIds: string[];
  templateEntityIds: string[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateTemplateGroup = Omit<TemplateGroup, | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplateGroup = Omit<UpdateTemplateGroup, '_id'>;

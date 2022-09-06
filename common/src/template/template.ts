export interface Template {
  readonly _id: string;

  name: string;
  description: string;
  tags: string[];

  templatedLayoutIds: string[];
  templatedEntityIds: string[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateTemplate = Omit<Template, | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplate = UpdateTemplate;

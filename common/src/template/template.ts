import { Entity } from '../entity/entity';
import { Layout } from '../layout/layout';

export interface Template {
  readonly _id: string;

  name: string;
  description: string;
  imageUrl?: string;
  tags?: string[];

  layouts: CreateTemplateLayout[];
  entities: CreateTemplateEntity[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type CreateTemplateLayout = Omit<Layout, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplateEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

export type TemplateSummary = Omit<Template, | 'layouts' | 'entities'>;
export type UpdateTemplate = Omit<Template, | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplate = UpdateTemplate;

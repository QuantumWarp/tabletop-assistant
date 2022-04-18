import { Entity } from '../entity/entity';
import { Layout } from '../layout/layout';

export interface Template {
  readonly _id: string;

  name: string;
  description: string;
  imageUrl?: string;
  tags?: string[];

  layouts: Omit<Layout, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>[];
  entities: Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type UpdateTemplate = Omit<Template, | 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplate = UpdateTemplate;

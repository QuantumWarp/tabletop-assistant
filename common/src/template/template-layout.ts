import { Layout } from '../layout/layout';

export type TemplateLayout = Omit<Layout, 'tabletopId' | 'userId'> & { referencedEntityIds: string[] };
export type UpdateTemplateLayout = Omit<TemplateLayout, 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplateLayout = Omit<UpdateTemplateLayout, '_id'>;

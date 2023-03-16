import { Entity } from '../entity/entity';

export type TemplateEntity = Omit<Entity, 'tabletopId' | 'userId'> & { referencedEntityIds: string[] };
export type UpdateTemplateEntity = Omit<TemplateEntity, 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplateEntity = Omit<UpdateTemplateEntity, '_id'>;

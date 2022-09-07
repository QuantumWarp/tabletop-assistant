import { Entity } from '../entity/entity';

export type TemplatedEntity = Omit<Entity, 'tabletopId' | 'userId'> & { referencedEntityIds: string[] };
export type UpdateTemplatedEntity = Omit<TemplatedEntity, 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplatedEntity = Omit<UpdateTemplatedEntity, '_id'>;

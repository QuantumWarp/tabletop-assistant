import { Entity } from 'tabletop-assistant-common';

export type TemplatedEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

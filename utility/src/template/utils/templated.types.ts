import { Entity, Layout, Template } from 'tabletop-assistant-common';

export type Templated = Omit<Template, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type TemplatedEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type TemplatedLayout = Omit<Layout, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

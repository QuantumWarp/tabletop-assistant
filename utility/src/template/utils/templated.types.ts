import { Entity, Layout } from 'tabletop-assistant-common';

export type TemplateEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type TemplateLayout = Omit<Layout, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

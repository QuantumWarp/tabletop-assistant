import {
  CreateTemplateEntity,
  CreateTemplateGroup,
  CreateTemplateLayout,
  CreateTemplateRoot,
  Entity,
  Layout,
} from 'tabletop-assistant-common';

export interface Collection {
  root: CreateTemplateRoot;
  groups: (Omit<CreateTemplateGroup, 'referencedEntityIds'> & { _id: string })[];
  layouts: (Omit<CreateTemplateLayout, 'referencedEntityIds'> & { _id: string })[];
  entities: (Omit<CreateTemplateEntity, 'referencedEntityIds'> & { _id: string })[];
}

export type TemplateEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type TemplateLayout = Omit<Layout, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

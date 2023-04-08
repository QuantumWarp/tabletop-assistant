import {
  CreateEntity,
  CreateLayout,
  CreateTemplateGroup,
  CreateTemplateRoot,
} from 'tabletop-assistant-common';

export interface Collection {
  root: CreateTemplateRoot;
  groups: (Omit<CreateTemplateGroup, 'referencedEntityIds'> & { _id: string })[];
  layouts: (CreateLayout & { _id: string })[];
  entities: (CreateEntity & { _id: string })[];
}

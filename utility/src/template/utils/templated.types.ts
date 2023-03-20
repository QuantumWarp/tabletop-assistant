import {
  CreateTemplateEntity,
  CreateTemplateGroup,
  CreateTemplateLayout,
  CreateTemplateRoot,
} from 'tabletop-assistant-common';

export interface Collection {
  root: CreateTemplateRoot;
  groups: (Omit<CreateTemplateGroup, 'referencedEntityIds'> & { _id: string })[];
  layouts: (Omit<CreateTemplateLayout, 'referencedEntityIds'> & { _id: string })[];
  entities: (Omit<CreateTemplateEntity, 'referencedEntityIds'> & { _id: string })[];
}

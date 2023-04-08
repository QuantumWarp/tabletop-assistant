import { Entity } from '../entity/entity';
import { Layout } from '../layout/layout';
import { TemplateGroup } from './template-group';

export interface TemplateSummary {
  groups: TemplateGroup[];
  layouts: Layout[];
  entities: Entity[];
}

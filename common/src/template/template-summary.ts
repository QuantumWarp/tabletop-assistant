import { TemplateGroup } from './template-group';
import { TemplateEntity } from './template-entity';
import { TemplateLayout } from './template-layout';

export interface TemplateSummary {
  groups: TemplateGroup[];
  layouts: TemplateLayout[];
  entities: TemplateEntity[];
}

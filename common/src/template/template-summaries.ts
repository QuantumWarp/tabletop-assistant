import { Template } from './template';
import { TemplatedEntity } from './templated-entity';
import { TemplatedLayout } from './templated-layout';

export interface TemplateSummaries {
  templates: Template[];
  layouts: TemplatedLayout[];
  entities: TemplatedEntity[];
}

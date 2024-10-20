import { Entity } from "../entity/entity";
import { Layout } from "../layout/layout";

export interface TemplateGroup {
  readonly id: string;

  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;

  readonly layouts: Layout[];
  readonly entities: Entity[];
}

import { Entity } from "../entity/entity";
import { Layout } from "../layout/layout";
import { TemplateGroup } from "./template-group";

export interface TemplateRoot {
  readonly id: string;

  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly tag: string;

  readonly groups: TemplateGroup[];
  readonly layouts: Layout[];
  readonly entities: Entity[];
}

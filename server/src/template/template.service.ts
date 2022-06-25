import { Types } from 'mongoose';
import { CreateEntity, CreateLayout, Entity } from 'tabletop-assistant-common';

import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import TemplateRepository from './template.repository';

type TemplatedEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

export default class TemplateService {
  constructor(
    private entityRepository: EntityRepository,
    private layoutRepository: LayoutRepository,
    private templateRepository: TemplateRepository,
  ) {}

  async import(templateId: string, tabletopId: string) {
    const template = await this.templateRepository.get(templateId);

    // Entities not duplicated
    const referencedTemplateIds = TemplateService.findReferencedIds(template.entities);

    const existingEntities = await this.entityRepository
      .getTemplated(tabletopId, referencedTemplateIds);
    const existingTemplateIds = existingEntities.map((x) => x.templateId);

    const newEntities = template.entities
      .filter((x) => !existingTemplateIds.includes(x._id))
      .map((x) => ({
        ...x,
        templateId: x._id,
        tabletopId,
        _id: new Types.ObjectId(),
      }));

    const idMap = TemplateService.createEntityIdMap(
      existingEntities.map((x) => ({ _id: x._id, templateId: templateId as string })),
      newEntities.map((x) => ({ _id: x._id.toString(), templateId: templateId as string })),
    );

    await Promise.all(newEntities
      .map((x) => TemplateService.updateEntityReferencedIds(x, idMap))
      .map((x) => this.entityRepository.create(x)));

    // Layouts created every time
    const newLayouts = template.layouts
      .map((x) => ({
        ...x,
        templateId: x._id,
        tabletopId,
        _id: new Types.ObjectId(),
      }));

    await Promise.all(newLayouts
      .map((x) => TemplateService.updateLayoutReferencedIds(x, idMap))
      .map((x) => this.layoutRepository.create(x)));
  }

  private static findReferencedIds(entities: TemplatedEntity[]) {
    return entities
      .map((x) => [x._id])
      .reduce((arr, x) => arr.concat(x), []);
  }

  private static createEntityIdMap(
    existingEntities: { _id: string, templateId?: string }[],
    newEntities: { _id: string, templateId?: string }[],
  ): { [templatedId: string]: string } {
    return existingEntities.concat(newEntities)
      .reduce((obj, x) => ({
        ...obj,
        [x.templateId as string]: x._id,
      }), {});
  }

  private static updateEntityReferencedIds(
    entity: CreateEntity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idMap: { [templatedId: string]: string },
  ): CreateEntity {
    return {
      ...entity,
    };
  }

  private static updateLayoutReferencedIds(
    entity: CreateLayout,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idMap: { [templatedId: string]: string },
  ): CreateLayout {
    return {
      ...entity,
    };
  }
}

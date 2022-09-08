import { Types } from 'mongoose';
import {
  CreateEntity, CreateLayout, TemplateImport, TemplateSummaries,
} from 'tabletop-assistant-common';

import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import ReferencedIdHelper from './referenced-id.helper';
import TemplateRepository from './template.repository';
import TemplatedEntityRepository from './templated-entity.repository';
import TemplatedLayoutRepository from './templated-layout.repository';

type CreateEntityWithId = CreateEntity & { _id: string };

export default class TemplateService {
  constructor(
    private entityRepository: EntityRepository,
    private layoutRepository: LayoutRepository,
    private templateRepository: TemplateRepository,
    private templatedLayoutRepository: TemplatedLayoutRepository,
    private templatedEntityRepository: TemplatedEntityRepository,
  ) {}

  async summaries(): Promise<TemplateSummaries> {
    return {
      templates: await this.templateRepository.getAll(),
      layouts: await this.templatedLayoutRepository.getAll(),
      entities: await this.templatedEntityRepository.getAll(),
    };
  }

  async import(model: TemplateImport) {
    const layoutsToImport = await this.templatedLayoutRepository.getAll(model.layoutIds);
    const entitiesToImport = await this.templatedEntityRepository.getAll(model.entityIds);

    const entityTemplateIds = Array.from(new Set([
      ...entitiesToImport.map((x) => x._id),
      ...layoutsToImport.map((x) => x.referencedEntityIds).reduce((arr, x) => arr.concat(x), []),
      ...entitiesToImport.map((x) => x.referencedEntityIds).reduce((arr, x) => arr.concat(x), []),
    ]));

    const existingEntities = await this.entityRepository
      .getTemplated(model.tabletopId, entityTemplateIds);
    const existingEntityTemplateIds = existingEntities.map((x) => x.templateId);

    const newEntities = entitiesToImport
      .filter((x) => !existingEntityTemplateIds.includes(x._id.toString()))
      .map((x) => (<CreateEntity & { _id: string }>{
        ...x,
        templateId: x._id,
        tabletopId: model.tabletopId,
        _id: new Types.ObjectId().toString(),
      }));

    const idMap = ReferencedIdHelper.createEntityIdMap(existingEntities, newEntities);

    const entitiesToSave = newEntities.map((x) => this.saveEntity(x, idMap));
    await Promise.all(entitiesToSave);

    const newLayouts = layoutsToImport
      .map((x) => ({
        ...x,
        templateId: x._id,
        tabletopId: model.tabletopId,
        _id: new Types.ObjectId().toString(),
      }));
    const layoutsToSave = newLayouts.map((x) => this.saveLayout(x, idMap));
    await Promise.all(layoutsToSave);
  }

  private async saveEntity(
    entity: CreateEntityWithId,
    idMap: { [templatedId: string]: string },
  ): Promise<void> {
    const entityRefs = ReferencedIdHelper.forEntity(entity);
    ReferencedIdHelper.setWithMap(entityRefs, idMap);
    await this.entityRepository.create(entity);
  }

  private async saveLayout(
    layout: CreateLayout,
    idMap: { [templatedId: string]: string },
  ): Promise<void> {
    const entityRefs = ReferencedIdHelper.forLayout(layout);
    ReferencedIdHelper.setWithMap(entityRefs, idMap);
    await this.layoutRepository.create(layout);
  }
}

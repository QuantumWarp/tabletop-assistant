import { Model, Types } from 'mongoose';
import {
  CreateEntity,
  CreateLayout,
  Template,
  TemplateImport,
  TemplateSummaries,
} from 'tabletop-assistant-common';
import { ReferencedIdHelper } from './referenced-id.helper';
import { EntityService } from '../entity/entity.service';
import { LayoutService } from '../layout/layout.service';
import { TemplatedEntityService } from './templated-entity.service';
import { TemplatedLayoutService } from './templated-layout.service';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

type CreateEntityWithId = CreateEntity & { _id: string };

export class TemplateService {
  constructor(
    @InjectModel('Template') private templateModel: Model<Template>,
    private entityRepository: EntityService,
    private layoutRepository: LayoutService,
    private templatedLayoutService: TemplatedLayoutService,
    private templatedEntityService: TemplatedEntityService,
  ) {}

  async getAll(ids?: string[]): Promise<Template[]> {
    if (ids) {
      return this.templateModel.find().where('_id').in(ids).exec();
    }

    return this.templateModel.find();
  }

  async get(_id: string): Promise<Template> {
    const model = await this.templateModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }

  async summaries(): Promise<TemplateSummaries> {
    return {
      templates: await this.getAll(),
      layouts: await this.templatedLayoutService.getAll(),
      entities: await this.templatedEntityService.getAll(),
    };
  }

  async import(userId: string, model: TemplateImport) {
    const layoutsToImport = await this.templatedLayoutService.getAll(
      model.layoutIds,
    );
    const entitiesToImport = await this.templatedEntityService.getAll(
      model.entityIds,
    );

    const entityTemplateIds = Array.from(
      new Set([
        ...entitiesToImport.map((x) => x._id),
        ...layoutsToImport
          .map((x) => x.referencedEntityIds)
          .reduce((arr, x) => arr.concat(x), []),
        ...entitiesToImport
          .map((x) => x.referencedEntityIds)
          .reduce((arr, x) => arr.concat(x), []),
      ]),
    );

    const existingEntities = await this.entityRepository.getTemplated(
      userId,
      model.tabletopId,
      entityTemplateIds,
    );
    const existingEntityTemplateIds = existingEntities.map((x) => x.templateId);

    const newEntities = entitiesToImport
      .filter((x) => !existingEntityTemplateIds.includes(x._id.toString()))
      .map(
        (x) =>
          <CreateEntity & { _id: string }>{
            ...x,
            templateId: x._id,
            tabletopId: model.tabletopId,
            _id: new Types.ObjectId().toString(),
          },
      );

    const idMap = ReferencedIdHelper.createEntityIdMap(
      existingEntities,
      newEntities,
    );

    const entitiesToSave = newEntities.map((x) =>
      this.saveEntity(userId, x, idMap),
    );
    await Promise.all(entitiesToSave);

    const newLayouts = layoutsToImport.map((x) => ({
      ...x,
      templateId: x._id,
      tabletopId: model.tabletopId,
      _id: new Types.ObjectId().toString(),
    }));
    const layoutsToSave = newLayouts.map((x) =>
      this.saveLayout(userId, x, idMap),
    );
    await Promise.all(layoutsToSave);
  }

  private async saveEntity(
    userId: string,
    entity: CreateEntityWithId,
    idMap: { [templatedId: string]: string },
  ): Promise<void> {
    const entityRefs = ReferencedIdHelper.forEntity(entity);
    ReferencedIdHelper.setWithMap(entityRefs, idMap);
    await this.entityRepository.create(userId, entity);
  }

  private async saveLayout(
    userId: string,
    layout: CreateLayout,
    idMap: { [templatedId: string]: string },
  ): Promise<void> {
    const entityRefs = ReferencedIdHelper.forLayout(layout);
    ReferencedIdHelper.setWithMap(entityRefs, idMap);
    await this.layoutRepository.create(userId, layout);
  }
}

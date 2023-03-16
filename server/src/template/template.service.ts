import { Model, Types } from 'mongoose';
import {
  CreateEntity,
  CreateLayout,
  TemplateRoot,
  TemplateImport,
  TemplateSummary,
} from 'tabletop-assistant-common';
import { ReferencedIdHelper } from './referenced-id.helper';
import { EntityService } from '../entity/entity.service';
import { LayoutService } from '../layout/layout.service';
import { TemplateGroupService } from './template-group.service';
import { TemplateEntityService } from './template-entity.service';
import { TemplateLayoutService } from './template-layout.service';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

type CreateEntityWithId = CreateEntity & { _id: string };

export class TemplateService {
  constructor(
    @InjectModel('TemplateRoot') private templateModel: Model<TemplateRoot>,
    private entityRepository: EntityService,
    private layoutRepository: LayoutService,
    private templateGroupService: TemplateGroupService,
    private templateLayoutService: TemplateLayoutService,
    private templateEntityService: TemplateEntityService,
  ) {}

  async getAll(ids?: string[]): Promise<TemplateRoot[]> {
    if (ids) {
      return this.templateModel.find().where('_id').in(ids).exec();
    }

    return this.templateModel.find();
  }

  async get(_id: string): Promise<TemplateRoot> {
    const model = await this.templateModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }

  async summaries(templateRootId?: string): Promise<TemplateSummary> {
    let templateRoot: TemplateRoot | null = null;
    if (templateRootId) templateRoot = await this.get(templateRootId);

    return {
      groups: await this.templateGroupService.getAll(
        templateRoot?.templateGroupIds,
      ),
      layouts: await this.templateLayoutService.getAll(
        templateRoot?.templateLayoutIds,
      ),
      entities: await this.templateEntityService.getAll(
        templateRoot?.templateEntityIds,
      ),
    };
  }

  async import(userId: string, model: TemplateImport) {
    const layoutsToImport = await this.templateLayoutService.getAll(
      model.layoutIds,
    );
    const entitiesToImport = await this.templateEntityService.getAll(
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

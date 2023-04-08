import { Model, Types } from 'mongoose';
import {
  TemplateRoot,
  TemplateImport,
  TemplateSummary,
} from 'tabletop-assistant-common';
import { EntityService } from '../entity/entity.service';
import { LayoutService } from '../layout/layout.service';
import { TemplateGroupService } from './template-group.service';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { ValueMapService } from '../value-map/value-map.service';

export class TemplateService {
  constructor(
    @InjectModel('TemplateRoot') private templateModel: Model<TemplateRoot>,
    private entityService: EntityService,
    private layoutService: LayoutService,
    private valueMapService: ValueMapService,
    private templateGroupService: TemplateGroupService,
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
      groups: await this.templateGroupService.getAll(templateRoot?.groupIds),
      layouts: await this.layoutService.getTemplates(templateRoot?.layoutIds),
      entities: await this.entityService.getTemplates(templateRoot?.entityIds),
    };
  }

  async import(userId: string, model: TemplateImport) {
    const layoutsToImport = await this.layoutService.getTemplates(
      model.layoutIds,
    );

    const saveLayouts = layoutsToImport
      .map((x) => ({
        ...x,
        tabletopId: model.tabletopId,
        _id: new Types.ObjectId().toString(),
      }))
      .map((x) => this.layoutService.create(userId, x));

    await Promise.all(saveLayouts);

    const entityIdsToImport = model.entityIds;

    const saveValueMaps = entityIdsToImport
      .map((x) => ({
        entityId: x,
        tabletopId: model.tabletopId,
        mappings: [],
      }))
      .map((x) => this.valueMapService.create(userId, x));

    await Promise.all(saveValueMaps);
  }
}

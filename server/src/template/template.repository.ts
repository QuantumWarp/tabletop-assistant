import { Entity, TemplateSummary } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import EntityModel from '../entity/entity.model';
import LayoutModel from '../layout/layout.model';
import TemplateModel from './template.model';
import ValuesModel from '../values/values.model';

export default class TemplateRepository {
  constructor(
    private userId: string,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  async getSummaries(): Promise<TemplateSummary[]> {
    return TemplateModel.find({}, { layouts: 0, entities: 0 });
  }

  async import(templateId: string, tabletopId: string): Promise<void> {
    const template = await TemplateModel.findOne({ _id: templateId });
    if (!template) throw new ResourceNotFound();

    const entityCreations = template.entities.map((x) => ({
      oldId: x._id,
      model: new EntityModel({
        ...x,
        _id: undefined,
        tabletopId,
        userId: this.userId,
      }),
    }));
    await Promise.all(entityCreations.map((x) => x.model.save()));
    await Promise.all(entityCreations.map((x) => this.createEmptyValues(x.model)));

    const layoutCreations = template.layouts.map((layout) => new LayoutModel({
      ...layout,
      entries: layout.entries.map((entry) => ({
        ...entry,
        entityId: entityCreations.find((x) => x.oldId === entry.entityId)?.model._id,
      })),
      tabletopId,
      userId: this.userId,
    }));

    await Promise.all(layoutCreations.map((x) => x.save()));
  }

  private async createEmptyValues(model: Entity) {
    const valuesModel = new ValuesModel({
      userId: this.userId,
      entityId: model._id,
      tabletopId: model.tabletopId,
      mappings: {},
    });
    await valuesModel.save();
  }
}

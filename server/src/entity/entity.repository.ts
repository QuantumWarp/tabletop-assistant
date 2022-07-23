import { Entity, CreateEntity, UpdateEntity } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import ValuesModel from '../value-map/value-map.model';
import EntityModel from './entity.model';

export default class EntityRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<Entity[]> {
    return EntityModel
      .find({ userId: this.userId, tabletopId });
  }

  async getTemplated(tabletopId: string, templateIds: string[]): Promise<Entity[]> {
    return EntityModel
      .find({ userId: this.userId, tabletopId })
      .where('templateId')
      .in(templateIds)
      .exec();
  }

  async get(_id: string): Promise<Entity> {
    const model = await EntityModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(entry: CreateEntity): Promise<Entity> {
    const model = new EntityModel({ ...entry, userId: this.userId });
    await model.save();
    await this.createEmptyValues(model);
    return model;
  }

  async update(entry: UpdateEntity): Promise<Entity> {
    const model = await EntityModel.findOne({ _id: entry._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();

    const valuesModel = await ValuesModel.findOne({ _id: entry._id, userId: this.userId });
    if (!valuesModel) await this.createEmptyValues(model);

    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await EntityModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();

    const valuesModel = await ValuesModel.findOne({ _id, userId: this.userId });
    if (valuesModel) await valuesModel.delete();
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

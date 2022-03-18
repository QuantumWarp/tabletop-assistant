import { Entity, CreateEntity, UpdateEntity } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import EntityModel from './entity.model';

export default class EntityRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<Entity[]> {
    return EntityModel.find({ userId: this.userId, tabletopId });
  }

  async get(_id: string): Promise<Entity> {
    const model = await EntityModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(entry: CreateEntity): Promise<Entity> {
    const model = new EntityModel({ ...entry, userId: this.userId });
    await model.save();
    return model;
  }

  async update(entry: UpdateEntity): Promise<Entity> {
    const model = await EntityModel.findOne({ _id: entry._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await EntityModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

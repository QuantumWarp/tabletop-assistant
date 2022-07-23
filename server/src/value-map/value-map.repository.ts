import { ValueMap, CreateValueMap, UpdateValueMap } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import ValueMapModel from './value-map.model';

export default class ValueMapRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<ValueMap[]> {
    return ValueMapModel.find({ userId: this.userId, tabletopId });
  }

  async get(entityId: string): Promise<ValueMap> {
    const model = await ValueMapModel.findOne({ entityId, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(entry: CreateValueMap): Promise<ValueMap> {
    const model = new ValueMapModel({ ...entry, userId: this.userId });
    await model.save();
    return model;
  }

  async update(entry: UpdateValueMap): Promise<ValueMap> {
    const model = await ValueMapModel.findOne({ _id: entry._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(entityId: string): Promise<void> {
    const model = await ValueMapModel.findOne({ entityId, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

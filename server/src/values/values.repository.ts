import { Values, CreateValues, UpdateValues } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import ValuesModel from './values.model';

export default class ValuesRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<Values[]> {
    return ValuesModel.find({ userId: this.userId, tabletopId });
  }

  async get(entityId: string): Promise<Values> {
    const model = await ValuesModel.findOne({ entityId, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(entry: CreateValues): Promise<Values> {
    const model = new ValuesModel({ ...entry, userId: this.userId });
    await model.save();
    return model;
  }

  async update(entry: UpdateValues): Promise<Values> {
    const model = await ValuesModel.findOne({ _id: entry._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(entityId: string): Promise<void> {
    const model = await ValuesModel.findOne({ entityId, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

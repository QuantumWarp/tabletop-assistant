import { HistoryEntry, CreateHistoryEntry, UpdateHistoryEntry } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import HistoryModel from './history.model';

export default class HistoryRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<HistoryEntry[]> {
    return HistoryModel.find({ userId: this.userId, tabletopId });
  }

  async get(_id: string): Promise<HistoryEntry> {
    const model = await HistoryModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(entry: CreateHistoryEntry): Promise<HistoryEntry> {
    const model = new HistoryModel({ ...entry, userId: this.userId });
    await model.save();
    return model;
  }

  async update(entry: UpdateHistoryEntry): Promise<HistoryEntry> {
    const model = await HistoryModel.findOne({ _id: entry._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await HistoryModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

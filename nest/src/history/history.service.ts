import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HistoryEntry,
  CreateHistoryEntry,
  UpdateHistoryEntry,
} from 'tabletop-assistant-common';

export class HistoryService {
  constructor(
    @InjectModel('History') private historyModel: Model<HistoryEntry>,
  ) {}

  async getAll(userId: string, tabletopId: string): Promise<HistoryEntry[]> {
    return this.historyModel.find({ tabletopId, userId });
  }

  async get(userId: string, _id: string): Promise<HistoryEntry> {
    const model = await this.historyModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    return model;
  }

  async create(
    userId: string,
    entry: CreateHistoryEntry,
  ): Promise<HistoryEntry> {
    const model = new this.historyModel({ ...entry, userId });
    await model.save();
    return model;
  }

  async update(
    userId: string,
    entry: UpdateHistoryEntry,
  ): Promise<HistoryEntry> {
    const model = await this.historyModel.findOne({ _id: entry._id, userId });
    if (!model) throw new NotFoundException();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.historyModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    await model.delete();
  }
}

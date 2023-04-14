import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ValueMap,
  CreateValueMap,
  UpdateValueMap,
} from 'tabletop-assistant-common';

export class ValueMapService {
  constructor(
    @InjectModel('ValueMap') private valueMapModel: Model<ValueMap>,
  ) {}

  async getAll(userId: string, tabletopId: string): Promise<ValueMap[]> {
    return this.valueMapModel.find({ tabletopId, userId });
  }

  async get(userId: string, entityId: string): Promise<ValueMap> {
    const model = await this.valueMapModel.findOne({ entityId, userId });
    if (!model) throw new NotFoundException();
    return model;
  }

  async create(userId: string, entries: CreateValueMap[]): Promise<ValueMap[]> {
    return await this.valueMapModel.create(
      entries.map((x) => ({ ...x, userId })),
    );
  }

  async update(userId: string, entries: UpdateValueMap[]): Promise<ValueMap[]> {
    const promises = entries.map(async (x) => {
      const model = await this.valueMapModel.findOne({ _id: x._id, userId });
      if (!model) return;
      model.set(x);
      await model.save();
      return model;
    });
    return await Promise.all(promises);
  }

  async delete(userId: string, entityId: string): Promise<void> {
    const model = await this.valueMapModel.findOne({ entityId, userId });
    if (!model) throw new NotFoundException();
    await model.delete();
  }
}

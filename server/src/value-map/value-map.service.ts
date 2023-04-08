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

  async create(userId: string, entry: CreateValueMap): Promise<ValueMap> {
    const model = new this.valueMapModel({ ...entry, userId });
    await model.save();
    return model;
  }

  async update(userId: string, entry: UpdateValueMap): Promise<ValueMap> {
    const model = await this.valueMapModel.findOne({ _id: entry._id, userId });
    if (!model) throw new NotFoundException();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(userId: string, entityId: string): Promise<void> {
    const model = await this.valueMapModel.findOne({ entityId, userId });
    if (!model) throw new NotFoundException();
    await model.delete();
  }
}

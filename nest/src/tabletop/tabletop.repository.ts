import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Tabletop,
  CreateTabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import { TabletopDocument } from './tabletop.model';

@Injectable()
export default class TabletopRepository {
  constructor(
    @InjectModel('Tabletop') private tabletopModel: Model<TabletopDocument>,
  ) {}

  async getAll(userId: string): Promise<Tabletop[]> {
    return this.tabletopModel.find({ userId });
  }

  async get(userId: string, _id: string): Promise<Tabletop> {
    const model = await this.tabletopModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(userId: string, tabletop: CreateTabletop): Promise<Tabletop> {
    const model = new this.tabletopModel({ ...tabletop, userId });
    await model.save();
    return model;
  }

  async update(userId: string, tabletop: UpdateTabletop): Promise<Tabletop> {
    const model = await this.tabletopModel.findOne({
      _id: tabletop._id,
      userId,
    });
    if (!model) throw new ResourceNotFound();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.tabletopModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Tabletop,
  CreateTabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import { TabletopDocument } from './tabletop.schema';

@Injectable()
export class TabletopService {
  constructor(
    @InjectModel('Tabletop') private tabletopModel: Model<TabletopDocument>,
  ) {}

  async getAll(userId: string): Promise<Tabletop[]> {
    return this.tabletopModel.find({ userId });
  }

  async get(userId: string, _id: string): Promise<Tabletop> {
    const model = await this.tabletopModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
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
    if (!model) throw new NotFoundException();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.tabletopModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    await model.deleteOne();
  }
}

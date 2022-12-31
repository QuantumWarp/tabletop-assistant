import { Injectable } from '@nestjs/common';
import {
  Tabletop,
  CreateTabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TabletopModel from './tabletop.model';

@Injectable()
export default class TabletopRepository {
  async getAll(userId: string): Promise<Tabletop[]> {
    return TabletopModel.find({ userId });
  }

  async get(userId: string, _id: string): Promise<Tabletop> {
    const model = await TabletopModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(userId: string, tabletop: CreateTabletop): Promise<Tabletop> {
    const model = new TabletopModel({ ...tabletop, userId });
    await model.save();
    return model;
  }

  async update(userId: string, tabletop: UpdateTabletop): Promise<Tabletop> {
    const model = await TabletopModel.findOne({ _id: tabletop._id, userId });
    if (!model) throw new ResourceNotFound();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await TabletopModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

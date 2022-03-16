import { Tabletop, CreateTabletop, UpdateTabletop } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TabletopModel from './tabletop.model';

export default class TabletopRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(): Promise<Tabletop[]> {
    return TabletopModel.find({ userId: this.userId });
  }

  async get(_id: string): Promise<Tabletop> {
    const model = await TabletopModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(tabletop: CreateTabletop): Promise<Tabletop> {
    const model = new TabletopModel({ ...tabletop, userId: this.userId });
    await model.save();
    return model;
  }

  async update(tabletop: UpdateTabletop): Promise<Tabletop> {
    const model = await TabletopModel.findOne({ _id: tabletop._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await TabletopModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

import { Layout, CreateLayout, UpdateLayout } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import LayoutModel from './layout.model';

export default class LayoutRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<Layout[]> {
    return LayoutModel.find({ userId: this.userId, tabletopId });
  }

  async get(_id: string): Promise<Layout> {
    const model = await LayoutModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(layout: CreateLayout): Promise<Layout> {
    const model = new LayoutModel({ ...layout, userId: this.userId });
    await model.save();
    return model;
  }

  async update(layout: UpdateLayout): Promise<Layout> {
    const model = await LayoutModel.findOne({ _id: layout._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(layout);
    await model.save();
    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await LayoutModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

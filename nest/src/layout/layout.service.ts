import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Layout, CreateLayout, UpdateLayout } from 'tabletop-assistant-common';

export class LayoutService {
  constructor(@InjectModel('Layout') private layoutModel: Model<Layout>) {}

  async getAll(userId: string, tabletopId: string): Promise<Layout[]> {
    return this.layoutModel.find({ tabletopId, userId });
  }

  async get(userId: string, _id: string): Promise<Layout> {
    const model = await this.layoutModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    return model;
  }

  async create(userId: string, layout: CreateLayout): Promise<Layout> {
    const model = new this.layoutModel({ ...layout, userId });
    await model.save();
    return model;
  }

  async update(userId: string, layout: UpdateLayout): Promise<Layout> {
    const model = await this.layoutModel.findOne({ _id: layout._id, userId });
    if (!model) throw new NotFoundException();
    model.set(layout);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.layoutModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    await model.delete();
  }

  async order(userId: string, ids: string[]): Promise<void> {
    const findPromises = ids.map((id) =>
      this.layoutModel.findOne({ _id: id, userId }),
    );
    const models = await Promise.all(findPromises);

    models.forEach((x, index) => x?.set({ order: index + 1 }));
    const savePromises = models.map((x) => x?.save());
    await Promise.all(savePromises);
  }
}

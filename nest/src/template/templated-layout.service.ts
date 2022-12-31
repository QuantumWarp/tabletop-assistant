/* eslint-disable class-methods-use-this */
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplatedLayout } from 'tabletop-assistant-common';

export class TemplatedLayoutService {
  constructor(
    @InjectModel('TemplatedLayout')
    private templatedLayoutModel: Model<TemplatedLayout>,
  ) {}

  async getAll(ids?: string[]): Promise<TemplatedLayout[]> {
    if (ids) {
      return this.templatedLayoutModel
        .find()
        .lean()
        .where('_id')
        .in(ids)
        .exec();
    }

    return this.templatedLayoutModel.find();
  }

  async get(_id: string): Promise<TemplatedLayout> {
    const model = await this.templatedLayoutModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }
}

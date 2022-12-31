import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplatedEntity } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';

export class TemplatedEntityService {
  constructor(
    @InjectModel('TemplatedEntity')
    private templatedEntityModel: Model<TemplatedEntity>,
  ) {}

  async getAll(ids?: string[]): Promise<TemplatedEntity[]> {
    if (ids) {
      return this.templatedEntityModel
        .find()
        .lean()
        .where('_id')
        .in(ids)
        .exec();
    }

    return this.templatedEntityModel.find();
  }

  async get(_id: string): Promise<TemplatedEntity> {
    const model = await this.templatedEntityModel.findOne({ _id });
    if (!model) throw new ResourceNotFound();
    return model;
  }
}

import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplateEntity } from 'tabletop-assistant-common';

export class TemplateEntityService {
  constructor(
    @InjectModel('TemplateEntity')
    private templateEntityModel: Model<TemplateEntity>,
  ) {}

  async getAll(ids?: string[]): Promise<TemplateEntity[]> {
    if (ids) {
      return this.templateEntityModel.find().lean().where('_id').in(ids).exec();
    }

    return this.templateEntityModel.find();
  }

  async get(_id: string): Promise<TemplateEntity> {
    const model = await this.templateEntityModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }
}

import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplateLayout } from 'tabletop-assistant-common';

export class TemplateLayoutService {
  constructor(
    @InjectModel('TemplateLayout')
    private templateLayoutModel: Model<TemplateLayout>,
  ) {}

  async getAll(ids?: string[]): Promise<TemplateLayout[]> {
    if (ids) {
      return this.templateLayoutModel.find().lean().where('_id').in(ids).exec();
    }

    return this.templateLayoutModel.find();
  }

  async get(_id: string): Promise<TemplateLayout> {
    const model = await this.templateLayoutModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }
}

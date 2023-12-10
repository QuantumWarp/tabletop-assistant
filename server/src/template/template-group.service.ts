import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplateGroup } from '@/common';

export class TemplateGroupService {
  constructor(
    @InjectModel('TemplateGroup')
    private templatedGroupModel: Model<TemplateGroup>,
  ) {}

  async getAll(ids?: string[]): Promise<TemplateGroup[]> {
    if (ids) {
      return this.templatedGroupModel.find().lean().where('_id').in(ids).exec();
    }

    return this.templatedGroupModel.find();
  }

  async get(_id: string): Promise<TemplateGroup> {
    const model = await this.templatedGroupModel.findOne({ _id });
    if (!model) throw new NotFoundException();
    return model;
  }
}

/* eslint-disable class-methods-use-this */
import { Template } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TemplateModel from './template.model';

export default class TemplateRepository {
  async getAll(ids?: string[]): Promise<Template[]> {
    if (ids) {
      return TemplateModel.find()
        .where('_id').in(ids).exec();
    }

    return TemplateModel.find();
  }

  async get(_id: string): Promise<Template> {
    const model = await TemplateModel.findOne({ _id });
    if (!model) throw new ResourceNotFound();
    return model;
  }
}

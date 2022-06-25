/* eslint-disable class-methods-use-this */
import { TemplateSummary, Template } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TemplateModel from './template.model';

export default class TemplateRepository {
  async getSummaries(): Promise<TemplateSummary[]> {
    return TemplateModel.find({}, { layouts: 0, entities: 0 });
  }

  async get(_id: string): Promise<Template> {
    const model = await TemplateModel.findOne({ _id });
    if (!model) throw new ResourceNotFound();
    return model;
  }
}

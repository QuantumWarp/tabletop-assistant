import { Template } from 'tabletop-assistant-common';
import TemplateModel from './template.model';

export default class TemplateRepository {
  // eslint-disable-next-line class-methods-use-this
  async getAll(): Promise<Template[]> {
    return TemplateModel.find();
  }
}

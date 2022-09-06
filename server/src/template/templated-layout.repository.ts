/* eslint-disable class-methods-use-this */
import { TemplatedLayout } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TemplatedLayoutModel from './templated-layout.model';

export default class TemplatedLayoutRepository {
  async getAll(ids?: string[]): Promise<TemplatedLayout[]> {
    if (ids) {
      return TemplatedLayoutModel.find()
        .where('_id').in(ids).exec();
    }

    return TemplatedLayoutModel.find();
  }

  async get(_id: string): Promise<TemplatedLayout> {
    const model = await TemplatedLayoutModel.findOne({ _id });
    if (!model) throw new ResourceNotFound();
    return model;
  }
}

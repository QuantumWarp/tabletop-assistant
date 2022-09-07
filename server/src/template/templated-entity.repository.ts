/* eslint-disable class-methods-use-this */
import { TemplatedEntity } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import TemplatedEntityModel from './templated-entity.model';

export default class TemplatedEntityRepository {
  async getAll(ids?: string[]): Promise<TemplatedEntity[]> {
    if (ids) {
      return TemplatedEntityModel.find().lean()
        .where('_id').in(ids)
        .exec();
    }

    return TemplatedEntityModel.find();
  }

  async get(_id: string): Promise<TemplatedEntity> {
    const model = await TemplatedEntityModel.findOne({ _id });
    if (!model) throw new ResourceNotFound();
    return model;
  }
}

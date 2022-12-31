import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, CreateEntity, UpdateEntity } from 'tabletop-assistant-common';
import { ValueMapService } from 'src/value-map/value-map.service';
import { ResourceNotFound } from '../setup/error';

export class EntityService {
  constructor(
    @InjectModel('Entity') private entityModel: Model<Entity>,
    private valueMapService: ValueMapService,
  ) {}

  async getAll(userId: string, tabletopId: string): Promise<Entity[]> {
    return this.entityModel.find({ tabletopId, userId });
  }

  async getTemplated(
    userId: string,
    tabletopId: string,
    templateIds: string[],
  ): Promise<Entity[]> {
    const models = await this.entityModel
      .find({ tabletopId, userId })
      .where('templateId')
      .in(templateIds)
      .exec();
    return models.map((x) => x.toObject());
  }

  async get(userId: string, _id: string): Promise<Entity> {
    const model = await this.entityModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    return model.toObject();
  }

  async create(userId: string, entry: CreateEntity): Promise<Entity> {
    const model = new this.entityModel({ ...entry, userId });
    await model.save();
    await this.valueMapService.createEmptyValues(userId, model.toObject());
    return model.toObject();
  }

  async update(userId: string, entry: UpdateEntity): Promise<Entity> {
    const model = await this.entityModel.findOne({ _id: entry._id, userId });
    if (!model) throw new ResourceNotFound();
    model.set(entry);
    await model.save();

    const valuesModel = await this.valueMapService.get(userId, entry._id);
    if (!valuesModel) {
      await this.valueMapService.createEmptyValues(userId, model.toObject());
    }

    return model.toObject();
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.entityModel.findOne({ _id, userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();

    const valuesModel = await this.valueMapService.get(userId, _id);
    if (valuesModel) await this.valueMapService.delete(userId, _id);
  }
}

import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, CreateEntity, UpdateEntity } from 'tabletop-assistant-common';
import { ValueMapService } from 'src/value-map/value-map.service';

export class EntityService {
  constructor(
    @InjectModel('Entity') private entityModel: Model<Entity>,
    private valueMapService: ValueMapService,
  ) {}

  async getAll(userId: string, tabletopId: string): Promise<Entity[]> {
    const valueMaps = await this.valueMapService.getAll(userId, tabletopId);
    const entityIds = valueMaps.map((x) => x.entityId);
    return this.entityModel.where('_id').in(entityIds).exec();
  }

  async getTemplates(ids: string[]): Promise<Entity[]> {
    const models = await this.entityModel.where('_id').in(ids).exec();
    return models.map((x) => x.toObject());
  }

  async get(userId: string, _id: string): Promise<Entity> {
    const model = await this.entityModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    return model.toObject();
  }

  async create(userId: string, entry: CreateEntity): Promise<Entity> {
    const model = new this.entityModel({ ...entry, userId });
    await model.save();
    return model;
  }

  async update(userId: string, entry: UpdateEntity): Promise<Entity> {
    const model = await this.entityModel.findOne({ _id: entry._id, userId });
    if (!model) throw new NotFoundException();
    model.set(entry);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.entityModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    await model.delete();

    const valuesModel = await this.valueMapService.get(userId, _id);
    if (valuesModel) await this.valueMapService.delete(userId, _id);
  }
}

import { Config, ConfigCreate, ConfigUpdate } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import ConfigModel from './config.model';

export default class ConfigRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(): Promise<Config[]> {
    return ConfigModel.find({ userId: this.userId });
  }

  async get(_id: string): Promise<Config> {
    const model = await ConfigModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(config: ConfigCreate): Promise<string> {
    const model = new ConfigModel({ ...config, userId: this.userId });
    await model.save();
    return model.id;
  }

  async update(config: ConfigUpdate): Promise<void> {
    const model = await ConfigModel.findOne({ _id: config._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(config);
    await model.save();
  }

  async delete(_id: string): Promise<void> {
    const model = await ConfigModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}

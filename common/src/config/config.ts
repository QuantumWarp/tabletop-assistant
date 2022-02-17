export interface Config {
  readonly _id: string;
  readonly userId: string;

  name: string;
  shortName: string;
  description?: string;
  imageUrl?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}

export type ConfigUpdate = Omit<Config, 'userId' | 'createdAt' | 'updatedAt' | '__v'>;
export type ConfigCreate = Omit<ConfigUpdate, '_id'>;

import 'dotenv/config';
import mongoose from 'mongoose';
import { templateRootSchema } from 'tabletop-assistant-server/src/template/template-root.schema';
import { templateGroupSchema } from 'tabletop-assistant-server/src/template/template-group.schema';
import { entitySchema } from 'tabletop-assistant-server/src/entity/entity.schema';
import { layoutSchema } from 'tabletop-assistant-server/src/layout/layout.schema';

import { Collection } from './utils/templated.types';
import collections from './collections';

const TemplateRootModel = mongoose.model('TemplateRoot', templateRootSchema);
const TemplateGroupModel = mongoose.model('TemplateGroup', templateGroupSchema);
const EntityModel = mongoose.model('Entity', entitySchema);
const LayoutModel = mongoose.model('Layout', layoutSchema);

const saveCollection = async (collection: Collection) => {
  const entityPromises = collection.entities
    .map((entity) => new EntityModel({
      ...entity,
      imageUrl: entity.imageUrl ? `${process.env.API_URL}/images/${entity.imageUrl}` : undefined,
    }))
    .map((x) => x.save());

  const layoutPromises = collection.layouts
    .map((layout) => new LayoutModel({
      ...layout,
    }))
    .map((x) => x.save());

  const groupPromises = collection.groups
    .map((group) => new TemplateGroupModel({
      ...group,
      imageUrl: group.imageUrl ? `${process.env.API_URL}/images/${group.imageUrl}` : undefined,
    }))
    .map((x) => x.save());

  const templateRootPromise = new TemplateRootModel({
    ...collection.root,
    imageUrl: collection.root.imageUrl ? `${process.env.API_URL}/images/${collection.root.imageUrl}` : undefined,
  }).save();

  await Promise.all([
    ...entityPromises,
    ...layoutPromises,
    ...groupPromises,
    templateRootPromise,
  ]);
};

const run = async () => {
  mongoose.connect(process.env.DB_CONNECTION ?? '');

  await TemplateRootModel.deleteMany();
  await TemplateGroupModel.deleteMany();
  await LayoutModel.deleteMany();
  await EntityModel.deleteMany();

  const savePromises = collections
    .map((x) => saveCollection(x));

  await Promise.all(savePromises);

  await mongoose.disconnect();
};

run();

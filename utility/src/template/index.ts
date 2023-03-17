import 'dotenv/config';
import mongoose from 'mongoose';
import { templateRootSchema } from 'tabletop-assistant-server/src/template/template-root.schema';
import { templateGroupSchema } from 'tabletop-assistant-server/src/template/template-group.schema';
import { templateEntitySchema } from 'tabletop-assistant-server/src/template/template-entity.schema';
import { templateLayoutSchema } from 'tabletop-assistant-server/src/template/template-layout.schema';
import { ReferencedIdHelper } from 'tabletop-assistant-server/src/template/referenced-id.helper';

import { Collection } from './utils/templated.types';
import collections from './collections';

const TemplateRootModel = mongoose.model('TemplateRoot', templateRootSchema);
const TemplateGroupModel = mongoose.model('TemplateGroup', templateGroupSchema);
const TemplateEntityModel = mongoose.model('TemplateEntity', templateEntitySchema);
const TemplateLayoutModel = mongoose.model('TemplateLayout', templateLayoutSchema);

const saveCollection = async (collection: Collection) => {
  const entityPromises = collection.entities
    .map((entity) => new TemplateEntityModel({
      ...entity,
      referencedEntityIds: ReferencedIdHelper.forEntity(entity).map((x) => x.entityId),
    }))
    .map((x) => x.save());

  const layoutPromises = collection.layouts
    .map((layout) => new TemplateLayoutModel({
      ...layout,
      referencedEntityIds: ReferencedIdHelper.forLayout(layout).map((x) => x.entityId),
    }))
    .map((x) => x.save());

  const groupPromises = collection.groups
    .map((x) => new TemplateGroupModel(x))
    .map((x) => x.save());

  const templateRootPromise = new TemplateRootModel(collection.root).save();

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
  await TemplateLayoutModel.deleteMany();
  await TemplateEntityModel.deleteMany();

  const savePromises = collections
    .map((x) => saveCollection(x));

  await Promise.all(savePromises);

  await mongoose.disconnect();
};

run();

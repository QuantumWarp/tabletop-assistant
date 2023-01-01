import 'dotenv/config';
import mongoose from 'mongoose';
import { templateSchema } from 'tabletop-assistant-server/src/template/template.schema';
import { templatedEntitySchema } from 'tabletop-assistant-server/src/template/templated-entity.schema';
import { templatedLayoutSchema } from 'tabletop-assistant-server/src/template/templated-layout.schema';
import { ReferencedIdHelper } from 'tabletop-assistant-server/src/template/referenced-id.helper';

import collections from './collections';
import { Collection } from './utils/templated.types';

const TemplateModel = mongoose.model('Entity', templateSchema);
const TemplatedEntityModel = mongoose.model('Layout', templatedEntitySchema);
const TemplatedLayoutModel = mongoose.model('ValueMap', templatedLayoutSchema);

const saveCollection = async (collection: Collection) => {
  const entityPromises = collection.entities
    .map((entity) => new TemplatedEntityModel({
      ...entity,
      referencedEntityIds: ReferencedIdHelper.forEntity(entity).map((x) => x.entityId),
    }))
    .map((x) => x.save());
  const layoutPromises = collection.layouts
    .map((layout) => new TemplatedLayoutModel({
      ...layout,
      referencedEntityIds: ReferencedIdHelper.forLayout(layout).map((x) => x.entityId),
    }))
    .map((x) => x.save());
  const templatePromises = collection.templates
    .map((x) => new TemplateModel(x))
    .map((x) => x.save());

  await Promise.all([...entityPromises, ...layoutPromises, ...templatePromises]);
};

const run = async () => {
  mongoose.connect(process.env.DB_CONNECTION ?? '');

  await TemplateModel.deleteMany();
  await TemplatedLayoutModel.deleteMany();
  await TemplatedEntityModel.deleteMany();

  const savePromises = collections
    .map((x) => saveCollection(x));

  await Promise.all(savePromises);

  await mongoose.disconnect();
};

run();

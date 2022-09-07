import 'dotenv/config';
import { connect, disconnect } from 'tabletop-assistant-server/src/setup/db';
import TemplateModel from 'tabletop-assistant-server/src/template/template.model';
import TemplatedLayoutModel from 'tabletop-assistant-server/src/template/templated-layout.model';
import TemplatedEntityModel from 'tabletop-assistant-server/src/template/templated-entity.model';
import ReferencedIdHelper from 'tabletop-assistant-server/src/template/referenced-id.helper';

import collections from './collections';
import { Collection } from './utils/templated.types';

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
  await connect(process.env.DB_CONNECTION ?? '');

  await TemplateModel.deleteMany();
  await TemplatedLayoutModel.deleteMany();
  await TemplatedEntityModel.deleteMany();

  const savePromises = collections
    .map((x) => saveCollection(x));

  await Promise.all(savePromises);

  await disconnect();
};

run();

import 'dotenv/config';
import { connect, disconnect } from 'tabletop-assistant-server/src/setup/db';
import TemplateModel from 'tabletop-assistant-server/src/template/template.model';
import TemplatedLayoutModel from 'tabletop-assistant-server/src/template/templated-layout.model';
import TemplatedEntityModel from 'tabletop-assistant-server/src/template/templated-entity.model';

import collections from './collections';
import { Collection } from './utils/templated.types';

const saveCollection = async (collection: Collection) => {
  const entityPromises = collection.entities
    .map((x) => new TemplatedEntityModel(x))
    .map((x) => x.save());
  const layoutPromises = collection.layouts
    .map((x) => new TemplatedLayoutModel(x))
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

// const run = async () => {
//   await connect(process.env.DB_CONNECTION ?? '');

//   await TemplateModel.deleteMany();

//   const savePromises = collections.reduce((arr, x) => arr.concat(x.templates), [] as Templated[])
//     .map((x) => new TemplateModel(x))
//     .map((x) => x.save());

//   await Promise.all(savePromises);

//   await disconnect();
// };

run();

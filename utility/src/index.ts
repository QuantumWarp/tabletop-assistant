import 'dotenv/config';
import { connect, disconnect } from 'mongoose';

import TemplateModel from './template.model';

import templates from './templates';

const run = async () => {
  await connect(process.env.DB_CONNECTION ?? '');

  await TemplateModel.deleteMany();

  const savePromises = templates
    .map((x) => new TemplateModel(x))
    .map((x) => x.save());

  await Promise.all(savePromises);

  await disconnect();
};

run();

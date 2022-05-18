import 'dotenv/config';
import { connect, disconnect } from 'tabletop-assistant-server/src/setup/db';
import TemplateModel from 'tabletop-assistant-server/src/template/template.model';

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

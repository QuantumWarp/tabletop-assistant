import 'dotenv/config';
import { connect, disconnect } from 'tabletop-assistant-server/src/setup/db';
import EntityModel from 'tabletop-assistant-server/src/entity/entity.model';
import LayoutModel from 'tabletop-assistant-server/src/layout/layout.model';
import ValuesModel from 'tabletop-assistant-server/src/values/values.model';

const run = async () => {
  await connect(process.env.DB_CONNECTION ?? '');

  await EntityModel.deleteMany();
  await LayoutModel.deleteMany();
  await ValuesModel.deleteMany();

  await disconnect();
};

run();

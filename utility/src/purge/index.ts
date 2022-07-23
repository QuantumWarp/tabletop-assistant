import 'dotenv/config';
import { connect, disconnect } from 'tabletop-assistant-server/src/setup/db';
import EntityModel from 'tabletop-assistant-server/src/entity/entity.model';
import LayoutModel from 'tabletop-assistant-server/src/layout/layout.model';
import ValueMapModel from 'tabletop-assistant-server/src/value-map/value-map.model';

const run = async () => {
  await connect(process.env.DB_CONNECTION ?? '');

  await EntityModel.deleteMany();
  await LayoutModel.deleteMany();
  await ValueMapModel.deleteMany();

  await disconnect();
};

run();

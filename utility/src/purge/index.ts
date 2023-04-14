import 'dotenv/config';
import mongoose from 'mongoose';

import { entitySchema } from 'tabletop-assistant-server/src/entity/entity.schema';
import { layoutSchema } from 'tabletop-assistant-server/src/layout/layout.schema';
import { valueMapSchema } from 'tabletop-assistant-server/src/value-map/value-map.schema';

const EntityModel = mongoose.model('Entity', entitySchema);
const LayoutModel = mongoose.model('Layout', layoutSchema);
const ValueMapModel = mongoose.model('ValueMap', valueMapSchema);

const run = async () => {
  mongoose.connect(process.env.DB_CONNECTION ?? '');

  await EntityModel.find().exists('userId', true).deleteMany();
  await LayoutModel.find().exists('userId', true).deleteMany();
  await ValueMapModel.deleteMany();

  await mongoose.disconnect();
};

run();

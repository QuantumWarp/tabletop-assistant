import { HydratedDocument, Schema } from 'mongoose';
import { TemplatedLayout } from 'tabletop-assistant-common';
import { layoutSchema } from '../layout/layout.schema';

const templatedLayoutSchema = new Schema<TemplatedLayout>(
  {
    ...layoutSchema.obj,
  },
  {
    timestamps: true,
  },
);

templatedLayoutSchema.remove('tabletopId');
templatedLayoutSchema.remove('userId');

export { templatedLayoutSchema };

export type TemplatedLayoutDocument = HydratedDocument<TemplatedLayout>;

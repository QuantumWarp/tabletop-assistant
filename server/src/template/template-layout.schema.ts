import { HydratedDocument, Schema } from 'mongoose';
import { TemplateLayout } from 'tabletop-assistant-common';
import { layoutSchema } from '../layout/layout.schema';

const templateLayoutSchema = new Schema<TemplateLayout>(
  {
    ...layoutSchema.obj,
  },
  {
    timestamps: true,
  },
);

templateLayoutSchema.remove('tabletopId');
templateLayoutSchema.remove('userId');

export { templateLayoutSchema };

export type TemplatedLayoutDocument = HydratedDocument<TemplateLayout>;

import { HydratedDocument, Schema } from 'mongoose';
import { TemplateEntity } from 'tabletop-assistant-common';
import { entitySchema } from '../entity/entity.schema';

const templateEntitySchema = new Schema<TemplateEntity>(
  {
    ...entitySchema.obj,
    referencedEntityIds: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

templateEntitySchema.remove('tabletopId');
templateEntitySchema.remove('userId');

export { templateEntitySchema };

export type TemplatedEntityDocument = HydratedDocument<TemplateEntity>;

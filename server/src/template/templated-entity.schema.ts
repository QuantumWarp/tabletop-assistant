import { HydratedDocument, Schema } from 'mongoose';
import { TemplatedEntity } from 'tabletop-assistant-common';
import { entitySchema } from '../entity/entity.schema';

const templatedEntitySchema = new Schema<TemplatedEntity>(
  {
    ...entitySchema.obj,
    referencedEntityIds: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

templatedEntitySchema.remove('tabletopId');
templatedEntitySchema.remove('userId');

export { templatedEntitySchema };

export type TemplatedEntityDocument = HydratedDocument<TemplatedEntity>;

import { model, Schema } from 'mongoose';
import { TemplatedEntity } from 'tabletop-assistant-common';
import { schema as entitySchema } from '../entity/entity.model';

const schema = new Schema<TemplatedEntity>({
  ...entitySchema.obj,
  referencedEntityIds: [{ type: String }],
}, {
  timestamps: true,
});

schema.remove('tabletopId');
schema.remove('userId');

export default model<TemplatedEntity>('TemplatedEntity', schema);

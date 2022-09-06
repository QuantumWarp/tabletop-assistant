import { model, Schema } from 'mongoose';
import { TemplatedLayout } from 'tabletop-assistant-common';
import { schema as layoutSchema } from '../layout/layout.model';

const schema = new Schema<TemplatedLayout>({
  ...layoutSchema.obj,
}, {
  timestamps: true,
});

schema.remove('tabletopId');
schema.remove('userId');

export default model<TemplatedLayout>('TemplatedLayout', schema);

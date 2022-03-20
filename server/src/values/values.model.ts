import { model, Schema } from 'mongoose';
import { Values } from 'tabletop-assistant-common';

const schema = new Schema<Values>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  entityId: { type: String, required: true, immutable: true },
  mappings: { type: Map },
}, {
  timestamps: true,
});

export default model<Values>('Values', schema);

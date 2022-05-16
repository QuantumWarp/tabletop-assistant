import { model, Schema } from 'mongoose';
import { Template } from 'tabletop-assistant-common';

const schema = new Schema<Template>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  tags: [{ type: String, required: true }],

  layouts: [{ type: Object }],
  entities: [{ type: Object }],
}, {
  timestamps: true,
});

export default model<Template>('Template', schema);

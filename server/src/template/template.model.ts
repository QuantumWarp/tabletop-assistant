import { model, Schema } from 'mongoose';
import { Template } from 'tabletop-assistant-common';

const schema = new Schema<Template>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String, required: true }],

  templatedEntityIds: [{ type: String }],
  templatedLayoutIds: [{ type: String }],
}, {
  timestamps: true,
});

export default model<Template>('Template', schema);

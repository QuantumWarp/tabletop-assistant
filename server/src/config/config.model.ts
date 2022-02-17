import { model, Schema } from 'mongoose';
import { Config } from 'tabletop-assistant-common';

const schema = new Schema<Config>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

export default model<Config>('Config', schema);

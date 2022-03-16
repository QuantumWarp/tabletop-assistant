import { model, Schema } from 'mongoose';
import { Tabletop } from 'tabletop-assistant-common';

const schema = new Schema<Tabletop>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

export default model<Tabletop>('Tabletop', schema);

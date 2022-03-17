import { model, Schema } from 'mongoose';
import { HistoryEntry } from 'tabletop-assistant-common';

const schema = new Schema<HistoryEntry>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
}, {
  timestamps: true,
});

export default model<HistoryEntry>('History', schema);

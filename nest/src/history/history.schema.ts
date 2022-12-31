import { HydratedDocument, Schema } from 'mongoose';
import { HistoryEntry } from 'tabletop-assistant-common';

export const historySchema = new Schema<HistoryEntry>(
  {
    userId: { type: String, required: true, immutable: true },
    tabletopId: { type: String, required: true, immutable: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export type HistoryDocument = HydratedDocument<History>;

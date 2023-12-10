import { HydratedDocument, Schema } from 'mongoose';
import { Tabletop } from '@/common';

export const tabletopSchema = new Schema<Tabletop>(
  {
    userId: { type: String, required: true, immutable: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export type TabletopDocument = HydratedDocument<Tabletop>;

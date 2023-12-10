import { HydratedDocument, Schema } from 'mongoose';
import { Note } from '@/common';

export const noteSchema = new Schema<Note>(
  {
    userId: { type: String, required: true, immutable: true },
    tabletopId: { type: String, required: true, immutable: true },
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export type NoteDocument = HydratedDocument<Note>;

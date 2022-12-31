import { HydratedDocument, Schema } from 'mongoose';
import { Template } from 'tabletop-assistant-common';

export const templateSchema = new Schema<Template>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],

    templatedEntityIds: [{ type: String }],
    templatedLayoutIds: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export type TemplateDocument = HydratedDocument<Template>;

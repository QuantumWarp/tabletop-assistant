import { HydratedDocument, Schema } from 'mongoose';
import { TemplateGroup } from 'tabletop-assistant-common';

export const templateGroupSchema = new Schema<TemplateGroup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },

    entityIds: [{ type: String }],
    layoutIds: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export type TemplateGroupDocument = HydratedDocument<TemplateGroup>;

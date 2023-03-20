import { HydratedDocument, Schema } from 'mongoose';
import { TemplateRoot } from 'tabletop-assistant-common';

export const templateRootSchema = new Schema<TemplateRoot>(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    tag: { type: String, required: true },

    templateGroupIds: [{ type: String }],
    templateEntityIds: [{ type: String }],
    templateLayoutIds: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export type TemplateRootDocument = HydratedDocument<TemplateRoot>;

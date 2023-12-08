import { HydratedDocument, Schema } from 'mongoose';
import { Layout } from 'tabletop-assistant-common';

export const layoutSchema = new Schema<Layout>(
  {
    userId: { type: String, immutable: true },
    isTemplate: { type: Boolean, immutable: true },
    tabletopId: { type: String, immutable: true },

    order: { type: Number, required: true },
    hidden: { type: Boolean },

    name: { type: String, required: true },

    entries: [
      {
        entityId: { type: String, required: true },
        displayKey: { type: String, required: true },
        position: {
          left: { type: Number, required: true },
          top: { type: Number, required: true },
        },
        size: {
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export type LayoutDocument = HydratedDocument<Layout>;

import { HydratedDocument, Schema } from 'mongoose';
import { Entity } from '@/common';

export const entitySchema = new Schema<Entity>(
  {
    userId: { type: String, immutable: true },
    isTemplate: { type: Boolean, immutable: true },

    name: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String },
    icon: { type: String },
    imageUrl: { type: String },

    fields: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        postfix: { type: String },
        initial: {},
        computed: {},
      },
    ],

    actions: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        roll: {},
        macros: {},
        triggers: [
          {
            manual: { type: Boolean },
            sibling: { type: Boolean },
            entityId: { type: String },
            actionKey: { type: String },
          },
        ],
      },
    ],

    displays: [
      {
        name: { type: String, required: true },
        key: { type: String, required: true },
        type: { type: String, required: true },
        default: { type: Boolean, required: true },
        mappings: [
          {
            slotKey: { type: String, required: true },
            fieldKey: { type: String, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  },
);

export type EntityDocument = HydratedDocument<Entity>;

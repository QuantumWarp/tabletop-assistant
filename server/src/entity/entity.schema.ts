import { HydratedDocument, Schema } from 'mongoose';
import { Entity } from 'tabletop-assistant-common';

export const entitySchema = new Schema<Entity>(
  {
    userId: { type: String, required: true, immutable: true },
    tabletopId: { type: String, required: true, immutable: true },
    templateId: { type: String, immutable: true },
    name: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String },
    icon: { type: String },
    imageUrl: { type: String },

    fields: [
      {
        _id: { id: false },
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
        _id: { id: false },
        key: { type: String, required: true },
        name: { type: String, required: true },
        roll: {},
        macros: {},
        triggers: [
          {
            _id: { id: false },
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
        _id: { id: false },
        name: { type: String, required: true },
        key: { type: String, required: true },
        type: { type: String, required: true },
        default: { type: Boolean, required: true },
        mappings: [
          {
            _id: { id: false },
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

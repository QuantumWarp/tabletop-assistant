import { model, Schema } from 'mongoose';
import { Entity } from 'tabletop-assistant-common';

const schema = new Schema<Entity>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  templateId: { type: String, immutable: true },
  name: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String },
  icon: { type: String },

  fields: [{
    _id: { id: false },
    key: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    postfix: { type: String },
    initial: {},
    computed: {},
  }],

  actions: [{
    _id: { id: false },
    key: { type: String, required: true },
    name: { type: String, required: true },
    roll: {},
    macros: {},
    triggers: [{
      _id: { id: false },
      manual: { type: Boolean, required: true },
      sibling: { type: Boolean, required: true },
      entityId: { type: String },
      actionKey: { type: String },
    }],
  }],

  displays: [{
    _id: { id: false },
    name: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: Boolean, required: true },
    mappings: { type: Map },
  }],
}, {
  timestamps: true,
});

export default model<Entity>('Entity', schema);

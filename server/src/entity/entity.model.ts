import { model, Schema } from 'mongoose';
import { Entity } from 'tabletop-assistant-common';

const schema = new Schema<Entity>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true },
  name: { type: String, required: true },
  group: { type: String },
  description: { type: String },
  icon: { type: String },

  fields: [{
    key: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    postfix: { type: String },
  }],

  actions: [{
    key: { type: String, required: true },
    name: { type: String, required: true },
    roll: { type: String },
    triggers: [{
      manual: { type: Boolean, required: true },
      sibling: { type: Boolean, required: true },
      action: {
        entityId: { type: String },
        actionKey: { type: String },
      },
    }],
  }],

  layouts: [{
    type: { type: String, required: true },
    default: { type: Boolean, required: true },
    slotMap: { type: Map },
  }],
}, {
  timestamps: true,
});

export default model<Entity>('Entity', schema);

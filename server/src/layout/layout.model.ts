import { model, Schema } from 'mongoose';
import { Layout } from 'tabletop-assistant-common';

const schema = new Schema<Layout>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  templateId: { type: String, immutable: true },

  order: { type: Number, required: true },
  hidden: { type: Boolean },

  name: { type: String, required: true },

  entries: [{
    _id: { id: false },
    entityId: { type: String, required: true },
    displayKey: { type: String, required: true },
    position: {
      _id: { id: false },
      left: { type: Number, required: true },
      top: { type: Number, required: true },
    },
    size: {
      _id: { id: false },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  }],
}, {
  timestamps: true,
});

export default model<Layout>('Layout', schema);

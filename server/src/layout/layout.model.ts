import { model, Schema } from 'mongoose';
import { Layout } from 'tabletop-assistant-common';

const schema = new Schema<Layout>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  name: { type: String, required: true },
  hidden: { type: Boolean },

  entries: [{
    _id: { id: false },
    entityId: { type: String, required: true },
    displayType: { type: String, required: true },
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

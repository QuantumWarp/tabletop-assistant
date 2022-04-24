import { model, Schema } from 'mongoose';
import { Layout } from 'tabletop-assistant-common';

const schema = new Schema<Layout>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  name: { type: String, required: true },
  hidden: { type: Boolean },

  entries: [{
    entityId: { type: String, required: true },
    displayType: { type: String, required: true },
    position: {
      left: { type: Number, required: true },
      top: { type: Number, required: true },
    },
    size: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  }],
}, {
  timestamps: true,
});

export default model<Layout>('Layout', schema);

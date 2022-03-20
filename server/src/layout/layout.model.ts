import { model, Schema } from 'mongoose';
import { Layout } from 'tabletop-assistant-common';

const schema = new Schema<Layout>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  name: { type: String, required: true },

  entries: [{
    entityId: { type: String, required: true },
    displayType: { type: String, required: true },
    position: {
      left: { type: String, required: true },
      top: { type: String, required: true },
    },
    size: {
      width: { type: String, required: true },
      height: { type: String, required: true },
    },
  }],
}, {
  timestamps: true,
});

export default model<Layout>('Layout', schema);

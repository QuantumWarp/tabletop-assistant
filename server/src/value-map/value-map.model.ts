import { model, Schema } from 'mongoose';
import { ValueMap } from 'tabletop-assistant-common';

const schema = new Schema<ValueMap>({
  userId: { type: String, required: true, immutable: true },
  tabletopId: { type: String, required: true, immutable: true },
  entityId: { type: String, required: true, immutable: true },
  mappings: [{
    fieldKey: { type: String, required: true },
    value: { type: String, required: true },
  }],
}, {
  timestamps: true,
});

export default model<ValueMap>('ValueMap', schema);

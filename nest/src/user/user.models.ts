import { model, Schema } from 'mongoose';

export interface User {
  readonly _id: string;

  sub: string;
  iss: string;
  email?: string;
  name?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly __v: number;
}
export type UpsertUser = Omit<User, '_id' | 'createdAt' | 'updatedAt' | '__v'>;

const schema = new Schema<User>(
  {
    sub: { type: String, required: true, immutable: true },
    iss: { type: String, required: true, immutable: true },
    email: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>('User', schema);

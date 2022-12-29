import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UpsertUser, UserDocument } from './user.models';

export default class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getAndUpsert(user: UpsertUser): Promise<User> {
    return this.userModel.findOneAndUpdate(
      {
        sub: user.sub,
        iss: user.iss,
      },
      user,
      {
        upsert: true,
        new: true,
      },
    );
  }
}

import { User, UpsertUser, UserModel } from './user.models';

export default class UserRepository {
  async getAndUpsert(user: UpsertUser): Promise<User> {
    return UserModel.findOneAndUpdate(
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

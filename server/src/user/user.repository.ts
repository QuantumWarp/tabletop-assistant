import {
  User,
  UserUpsert,
  UserModel,
} from './user.models';

export default class UserRepository {
  // eslint-disable-next-line class-methods-use-this
  async getAndUpsert(user: UserUpsert): Promise<User> {
    return UserModel.findOneAndUpdate({
      sub: user.sub,
      iss: user.iss,
    }, user, {
      upsert: true,
      new: true,
    });
  }
}

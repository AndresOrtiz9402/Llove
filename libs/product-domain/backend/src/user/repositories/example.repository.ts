import { User } from '@llove/models';
import { Infrastructure } from '..';

export class ExampleRepository implements User.UserRepository {
  async getById(params: User.GetByIdParam): Promise<User.UserResponse | null> {
    const { id } = params;

    const user = Infrastructure.USER_COLLECTION.find((user) => user.id === id);

    return user
      ? ({ id, name: user.name, email: user.email } as User.UserResponse)
      : null;
  }
}

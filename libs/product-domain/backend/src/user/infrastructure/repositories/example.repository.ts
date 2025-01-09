import { User } from '@llove/models';

export class ExampleRepository implements User.UserRepository {
  constructor(private USER_COLLECTION: User.UserEntity[]) {}

  async getById(params: User.GetByIdParam): Promise<User.UserResponse | null> {
    const { id } = params;

    const user = this.USER_COLLECTION.find((user) => user.id === id);

    return user
      ? ({ id, name: user.name, email: user.email } as User.UserResponse)
      : null;
  }
}

import { User } from '@llove/models';

export class TypeormUserRepository implements User.UserRepository {
  async getById(params: User.GetByIdParam): Promise<User.UserResponse | null> {
    const { id } = params;
    return null;
  }
}

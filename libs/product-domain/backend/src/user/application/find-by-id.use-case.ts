import { type User } from '@llove/models';
import { UserNotFoundException } from '.';

export class UserFindByIdUseCase {
  constructor(private readonly userRepository: User.UserRepository) {}

  async run(
    params: User.GetByIdParam
  ): Promise<User.infrastructure.UserResponse> {
    const { id } = params;
    const user = (await this.userRepository.getById({
      id,
    })) as User.infrastructure.UserResponse | null;

    if (!user) throw new UserNotFoundException({ id });

    return user;
  }
}

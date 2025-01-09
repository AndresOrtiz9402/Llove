import { User } from '@llove/models';
import { UserFindByIdUseCase } from '.';

export class UserService {
  constructor(private readonly userFindByIdUseCase: UserFindByIdUseCase) {}

  findById(
    params: User.GetByIdParam
  ): Promise<User.infrastructure.UserResponse> {
    return this.userFindByIdUseCase.run(params);
  }
}

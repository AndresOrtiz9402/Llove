import { IGetByIdParam, IUserDto, IUserRepository } from '@llove/models';
import { UserNotFoundException } from '../..';

export class UserFindByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(params: IGetByIdParam): Promise<IUserDto> {
    const { id } = params;
    const user = (await this.userRepository.getById({
      id,
    })) as IUserDto | null;

    if (!user) throw new UserNotFoundException({ id });

    return user;
  }
}

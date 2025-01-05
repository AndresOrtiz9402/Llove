import { IGetByIdParam, IUserDto } from '@llove/models';
import { UserFindByIdUseCase } from '../..';

export class UserService {
  constructor(private readonly userFindByIdUseCase: UserFindByIdUseCase) {}

  findById(params: IGetByIdParam): Promise<IUserDto> {
    return this.userFindByIdUseCase.run(params);
  }
}

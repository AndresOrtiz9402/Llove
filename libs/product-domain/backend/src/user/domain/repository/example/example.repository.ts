import { IGetByIdParam, IUserDto, IUserRepository } from '@llove/models';
import { USER_COLLECTION } from '../../..';

export class ExampleRepository implements IUserRepository {
  async getById(params: IGetByIdParam): Promise<IUserDto | null> {
    const { id } = params;

    const user = USER_COLLECTION.find((user) => user.id === id);

    return user
      ? ({ id, name: user.name, email: user.email } as IUserDto)
      : null;
  }
}

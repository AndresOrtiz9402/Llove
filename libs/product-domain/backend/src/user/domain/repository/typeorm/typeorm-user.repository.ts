import { IGetByIdParam, IUserDto, IUserRepository } from '@llove/models';

export class TypeormUserRepository implements IUserRepository {
  async getById(params: IGetByIdParam): Promise<IUserDto | null> {
    const { id } = params;
    return null;
  }
}

import { IUserDto } from '..';

export interface IGetByIdParam {
  id: number;
}

export interface IUserRepository {
  getById(params: IGetByIdParam): Promise<IUserDto | null>;
}

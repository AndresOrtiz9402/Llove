import { UserResponse } from './infrastructure';

export interface GetByIdParam {
  id: number;
}

export interface UserRepository {
  getById(params: GetByIdParam): Promise<UserResponse | null>;
}

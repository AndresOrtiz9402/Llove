import { UserResponse } from '.';

export interface GetByIdParam {
  id: number;
}

export interface UserRepository {
  getById(params: GetByIdParam): Promise<UserResponse | null>;
}

import { IGetByIdParam } from '@llove/models';

export class UserNotFoundException extends Error {
  constructor(params: IGetByIdParam) {
    const { id } = params;
    super(`User ${id} not found.`);
  }
}

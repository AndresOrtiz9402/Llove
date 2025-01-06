import { User } from '@llove/models';

export class UserNotFoundException extends Error {
  constructor(params: User.GetByIdParam) {
    const { id } = params;
    super(`User ${id} not found.`);
  }
}

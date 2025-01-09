import { Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';
import { USER_COLLECTION } from '../assets/user-collection';

@Injectable()
export class AppService extends User.Application.UserService {
  constructor() {
    super(
      new User.Application.UserFindByIdUseCase(
        new User.Infrastructure.Repositories.ExampleRepository(USER_COLLECTION)
      )
    );
  }
}

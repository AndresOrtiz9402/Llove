import { Inject, Injectable } from '@nestjs/common';

import { Shared, User } from '@llove/product-domain/backend';

import { Config } from '../..';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type BFF_ENV = Config.BFF_ENV;

@Injectable()
export class AppService {
  constructor(@Inject('BFF_ENV') private BFF_ENV: BFF_ENV) {}

  userCreate(createUserDto: CreateUserDto) {
    return Shared.Http.post(
      createUserDto,
      this.BFF_ENV.USER_API_URL + '/create'
    );
  }
}

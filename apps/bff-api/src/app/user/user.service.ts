import { Inject, Injectable } from '@nestjs/common';

import { Shared, User } from '@llove/product-domain/backend';

import { Config } from '../..';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;
type BFF_ENV = Config.BFF_ENV;

@Injectable()
export class UserService {
  constructor(@Inject('BFF_ENV') private BFF_ENV: BFF_ENV) {}

  create(createUserDto: CreateUserDto) {
    return Shared.Infrastructure.Http.post(createUserDto, this.BFF_ENV.USER_API_URL + '/user');
  }

  deleteById(id: number) {
    return Shared.Infrastructure.Http.deleteReq(this.BFF_ENV.USER_API_URL + `/user/${id}`);
  }

  async getAll() {
    try {
      return (await fetch(this.BFF_ENV.USER_API_URL + '/user/all')).json();
    } catch (error) {
      return {
        status: 'fail',
        error,
      };
    }
  }

  async getById(id: number) {
    try {
      return (await fetch(this.BFF_ENV.USER_API_URL + `/user/${id}`)).json();
    } catch (error) {
      return {
        status: 'fail',
        error,
      };
    }
  }

  updateById(id: number, updateInput: UpdateUserDto) {
    return Shared.Infrastructure.Http.patch(this.BFF_ENV.USER_API_URL + `/user/${id}`, updateInput);
  }
}

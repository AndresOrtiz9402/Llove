import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

import { Config } from '../..';

type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;

const {
  DeleteUser: { BFF_DELETE_USER },
  UpdateUser: { BFF_UPDATE_USER },
} = User.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class UserService {
  constructor(
    private readonly BFF_ENV: Config.BffEnv,
    private readonly httpService: HttpService
  ) {}

  @HandleService(BFF_DELETE_USER)
  async deleteById(id: number) {
    return (await this.httpService.axiosRef.delete(this.BFF_ENV.USER_API_URL + `/user/${id}`)).data;
  }

  @HandleService(BFF_UPDATE_USER)
  async updateById(id: number, updateInput: UpdateUserDto) {
    return (
      await this.httpService.axiosRef.patch(this.BFF_ENV.USER_API_URL + `/user/${id}`, updateInput)
    ).data;
  }
}

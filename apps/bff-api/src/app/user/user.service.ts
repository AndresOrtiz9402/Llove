import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

import { Config } from '../..';

type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;

const {
  DeleteUser: { BFF_DELETE_USER },
  UpdateUser: { BFF_UPDATE_USER },
  ExampleService: { BFF_EXAMPLE_METHOD },
} = User.Application;

const { HandleService, HttpStatus } = Shared.Decorators.ServiceHandle;

@Injectable()
export class UserService {
  constructor(private readonly BFF_ENV: Config.BffEnv, private readonly httpService: HttpService) {}

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

  //EXAMPLE METHOD
  @HandleService(BFF_EXAMPLE_METHOD)
  async exampleMethod(query: any) {
    if (query?.throw_me_an_error) {
      const typeError = HttpStatus[query?.throw_me_an_error];
      console.log('Error type: ', typeError);

      throw new Error(HttpStatus[typeError] ?? HttpStatus[500]);
    }

    if (query?.cat_fact) {
      return (await this.httpService.axiosRef.get('https://catfact.ninja/fact')).data;
    }

    return query;
  }
}

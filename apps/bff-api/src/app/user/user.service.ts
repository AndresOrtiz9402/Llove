import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

import { Config } from '../..';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UserAuthenticationDto = User.Infrastructure.Dtos.UserAuthenticationDto;
type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;
type BFF_ENV = Config.BFF_ENV;

const {
  CreateUser: { BFF_REGISTER_USER },
  DeleteUser: { BFF_DELETE_USER },
  GetUser: { BFF_USER_AUTHENTICATION },
  UpdateUser: { BFF_UPDATE_USER },
  ExampleService: { BFF_EXAMPLE_METHOD },
} = User.Application;

const { HandleService, HttpStatus } = Shared.Decorators.ServiceHandle;

@Injectable()
export class UserService {
  constructor(
    @Inject('BFF_ENV') private readonly BFF_ENV: BFF_ENV,
    private readonly httpService: HttpService
  ) {}

  @HandleService(BFF_DELETE_USER)
  async deleteById(id: number) {
    return (await this.httpService.axiosRef.delete(this.BFF_ENV.USER_API_URL + `/user/${id}`)).data;
  }

  //TODO: completar el login service.
  @HandleService(BFF_USER_AUTHENTICATION)
  async login(input: UserAuthenticationDto) {
    return (
      await this.httpService.axiosRef.get(this.BFF_ENV.USER_API_URL + `/user/findOne`, {
        headers: {
          ...input,
        },
      })
    ).data;

    //TODO: add the token generation algorithm / session.
  }

  //TODO: crear el logout service.

  //TODO: completar el register service
  @HandleService(BFF_REGISTER_USER)
  async register(input: { registerDto: CreateUserDto }) {
    const { registerDto } = input;
    return (await this.httpService.axiosRef.post(this.BFF_ENV.USER_API_URL + '/user', registerDto))
      .data;
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

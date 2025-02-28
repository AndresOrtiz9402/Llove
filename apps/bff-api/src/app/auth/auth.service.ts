import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

import { Config } from '../..';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UserAuthenticationDto = User.Infrastructure.Dtos.UserAuthenticationDto;
type BFF_ENV = Config.BFF_ENV;

const {
  CreateUser: { BFF_REGISTER_USER },
  GetUser: { BFF_USER_AUTHENTICATION },
} = User.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('BFF_ENV') private readonly BFF_ENV: BFF_ENV,
    private readonly httpService: HttpService
  ) {}

  //TODO: completar el login service.
  @HandleService(BFF_USER_AUTHENTICATION)
  async login(loginDto: UserAuthenticationDto) {
    const user = (
      await this.httpService.axiosRef.get(this.BFF_ENV.USER_API_URL + `/user/findOne`, {
        headers: {
          ...loginDto,
        },
      })
    ).data;

    const isRegistered = user.statusCode === 302;

    //TODO: create the dispatch method for the 401 (Unauthorized) error.

    //TODO: add the token generation step. The token must contain the session information and the user ID.

    //TODO: add the step to retrieve the token for the user.

    //TODO: add the success return message.

    return { ...user, isRegistered };
  }

  //TODO: crear el logout service.

  //TODO: completar el register service
  @HandleService(BFF_REGISTER_USER)
  async register(input: { registerDto: CreateUserDto }) {
    const { registerDto } = input;
    const user = (
      await this.httpService.axiosRef.post(this.BFF_ENV.USER_API_URL + '/user', registerDto)
    ).data;

    //TODO: Add the login step after the user registers.

    return user;
  }
}

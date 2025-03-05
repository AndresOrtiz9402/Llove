import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Shared } from '@llove/backend';
import type { IAuth, IUser } from '@llove/models';
import { IShared } from '@llove/models';
import { User } from '@llove/product-domain/backend';
import { Config } from '../..';

type AccessToken = IAuth.AccessToken;
type BFF_ENV = Config.BFF_ENV;
type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type Result<R> = IShared.Services.ServiceHandle.Result<R>;
type User = IUser.User;
type UserAuthenticationDto = User.Infrastructure.Dtos.UserAuthenticationDto;

const HttpStatus = IShared.Services.ServiceHandle.HttpStatus;

const {
  GetUser: { BFF_USER_AUTHENTICATION },
} = User.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('BFF_ENV') private readonly BFF_ENV: BFF_ENV,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  //TODO: add the third party authentication case.
  @HandleService(BFF_USER_AUTHENTICATION)
  async login(loginDto: UserAuthenticationDto): Promise<AccessToken> {
    const user: Result<User> = (
      await this.httpService.axiosRef.get(this.BFF_ENV.USER_API_URL + `/user/findOne`, {
        headers: {
          ...loginDto,
        },
      })
    ).data;

    const isRegistered = user.statusCode === 302;

    if (!isRegistered) throw new Error(HttpStatus[401]);

    const { id, name } = user.data;

    const payload = { sub: id, username: name };

    const access_token = await this.jwtService.signAsync(payload);

    //TODO: add the refresh token step.

    return {
      access_token,
    };
  }

  //TODO: add the third party logout case.
  logout(session: IAuth.Session): IAuth.Session {
    return session;
  }

  //TODO: add the third party registration case.
  @HandleService(BFF_USER_AUTHENTICATION)
  async register(input: { registerDto: CreateUserDto }): Promise<AccessToken> {
    const { registerDto } = input;
    const user = (
      await this.httpService.axiosRef.post(this.BFF_ENV.USER_API_URL + '/user', registerDto)
    ).data as Result<User>;

    const { data } = user;

    const { email } = data;

    return await this.login({ email });
  }
}

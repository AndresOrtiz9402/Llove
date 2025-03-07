import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//libs
import type { IAuth, IUser } from '@llove/models';
import { Shared } from '@llove/backend';
import { IShared } from '@llove/models';
import { User } from '@llove/product-domain/backend';

//modules
import { Config } from '../..';

//types
type Credentials = IAuth.Credentials;
type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type Email = string;
type Result<R> = IShared.Services.ServiceHandle.Result<R>;
type User = IUser.User;

//constants
const HttpStatus = IShared.Services.ServiceHandle.HttpStatus;

const {
  GetUser: { BFF_USER_AUTHENTICATION },
} = User.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class AuthenticationService implements IAuth.AuthServiceInterface {
  constructor(
    private readonly BFF_ENV: Config.BffEnv,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  //TODO: add the third party registration case.
  @HandleService(BFF_USER_AUTHENTICATION)
  async register(registerDto: CreateUserDto): Promise<Credentials> {
    const user = (
      await this.httpService.axiosRef.post(this.BFF_ENV.USER_API_URL + '/user', registerDto)
    ).data as Result<User>;

    const { data } = user;

    const { email } = data;

    return await this.login({ email });
  }

  //TODO: add the third party authentication case.
  @HandleService(BFF_USER_AUTHENTICATION)
  async login(loginDto: { email: Email }): Promise<Credentials> {
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

    const payload = { sub: id };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    const now = Date.now();

    const createAt = new Date(now);

    const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000); // expire in 7 days

    //TODO: add the refresh token step.

    return {
      accessToken,
      refreshToken,
      session: {
        username: name,
        createAt,
        expiresAt,
      },
    };
  }

  @HandleService<string>()
  async logout(): Promise<string> {
    return 'logout';
  }
}

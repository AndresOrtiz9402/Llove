import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//libs
import { IAuth, IUser } from '@llove/models';
import { Shared } from '@llove/backend';
import { IShared } from '@llove/models';
import { User, Auth } from '@llove/product-domain/backend';

//modules
import { Config } from '../..';
import { unknown } from 'zod';

//types
type Credentials = IAuth.Credentials;
type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type LoginDto = IAuth.LoginDto;
type LoginOrRegisterDto = IAuth.LoginOrRegisterDto;
type Result<R> = IShared.Services.ServiceHandle.Result<R>;
type User = IUser.User;
type AuthenticatedUser = IAuth.AuthenticatedUser;

//constants
const HttpStatus = IShared.Services.ServiceHandle.HttpStatus;
const { JWT_ACCESS_TOKEN_EXPIRATION, SESSION_EXPIRATION } = IAuth.AuthConstants;

const {
  Login: { LOGIN },
  Register: { REGISTER },
  LoginOrRegister: { LOGIN_OR_REGISTER },
} = Auth.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class AuthService implements IAuth.AuthServiceInterface {
  constructor(
    private readonly BFF_ENV: Config.BffEnv,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  //controller services
  @HandleService(LOGIN)
  async login(loginDto: LoginDto): Promise<Credentials> {
    const { id, username } = await this.validateUser(loginDto);

    const accessToken = await this.jwtService.signAsync(
      { sub: id },
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION }
    );

    const session = this.getSession(username);

    return {
      accessToken,
      session,
    };
  }

  @HandleService<string>()
  async logout(): Promise<string> {
    return 'logout';
  }

  @HandleService(REGISTER)
  async register(registerDto: CreateUserDto): Promise<Credentials> {
    const user = (
      await this.httpService.axiosRef.post(this.BFF_ENV.USER_API_URL + '/user', registerDto)
    ).data as Result<User>;

    if (user.statusCode === 409) throw new Error(HttpStatus[409]);

    return await this.login({ email: user.data.email });
  }

  //third party service
  @HandleService(LOGIN_OR_REGISTER)
  async loginOrRegister(loginOrRegisterDto: LoginOrRegisterDto): Promise<Credentials> {
    const result = (await this.login({
      email: loginOrRegisterDto.email,
    })) as unknown as Result<Credentials>;

    if (result.statusCode === 401) {
      const registerResult = (await this.register({
        email: loginOrRegisterDto.email,
        name: loginOrRegisterDto.username,
      })) as unknown as Result<Credentials>;

      if (registerResult.statusCode === 409) throw new Error(HttpStatus[409]);

      return registerResult.data;
    } else return result.data;
  }

  //Utility methods
  private getSession(username: string): IAuth.Session {
    const now = Date.now();

    const createAt = new Date(now);

    const expiresAt = new Date(now + SESSION_EXPIRATION); // expire in 1 day

    return {
      username: username,
      createAt,
      expiresAt,
    };
  }

  private async validateUser(loginDto: LoginDto): Promise<AuthenticatedUser> {
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

    return { id, username: name };
  }
}

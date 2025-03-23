import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

//libs
import { NestModules } from '@llove/backend';
import { IAuth } from '@llove/models';
import { User, Auth } from '@llove/product-domain/backend';

//modules
import { AuthService } from './auth.service';

//types
type UserAuthenticationDto = User.Infrastructure.Dtos.UserAuthenticationDto;
type LoginOrRegisterDto = IAuth.LoginOrRegisterDto;

//constants
const {
  GOOGLE_AUTH_API_OPERATION,
  LOGIN_API_OPERATION,
  LOGOUT_API_OPERATION,
  REGISTER_API_OPERATION,
  REGISTER_API_BODY,
} = Auth.Infrastructure.ApiDocs;

const {
  Interceptors: { StatusCodeInterceptor, LoginInterceptor, LogoutInterceptor },
  Decorators: { GetUser },
  Guards: { GoogleAuthGuard },
  Api: {
    Auth: {
      Strategies: { TokenErrorFilter },
    },
  },
} = NestModules;

//controller
@UseInterceptors(StatusCodeInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(GOOGLE_AUTH_API_OPERATION)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return; // Passport automatically redirects to Google.
  }

  @ApiExcludeEndpoint()
  @UseFilters(TokenErrorFilter)
  @UseInterceptors(LoginInterceptor)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard) // Handle the redirection of Google
  async googleAuthRedirect(@GetUser() user: LoginOrRegisterDto) {
    return this.authService.loginOrRegister(user);
  }

  @ApiOperation(LOGIN_API_OPERATION)
  @UseInterceptors(LoginInterceptor)
  @Post('/login')
  login(@Body() loginDto: UserAuthenticationDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation(LOGOUT_API_OPERATION)
  @UseInterceptors(LogoutInterceptor)
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @ApiOperation(REGISTER_API_OPERATION)
  @ApiBody(REGISTER_API_BODY)
  @UseInterceptors(LoginInterceptor)
  @Post('/register')
  register(@Body() registerDto: User.Infrastructure.Dtos.CreateUserDto) {
    return this.authService.register(registerDto);
  }
}

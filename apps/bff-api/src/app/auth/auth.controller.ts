import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

//libs
import { NestModules } from '@llove/backend';
import { IAuth } from '@llove/models';
import { User } from '@llove/product-domain/backend';

//modules
import { AuthService } from './auth.service';

//types
type UserAuthenticationDto = User.Infrastructure.Dtos.UserAuthenticationDto;
type LoginOrRegisterDto = IAuth.LoginOrRegisterDto;

//constants
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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return; // Passport automatically redirects to Google.
  }

  @UseFilters(TokenErrorFilter)
  @UseInterceptors(LoginInterceptor)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard) // Handle the redirection of Google
  async googleAuthRedirect(@GetUser() user: LoginOrRegisterDto) {
    return this.authService.loginOrRegister(user);
  }

  @UseInterceptors(LoginInterceptor)
  @Post('/login')
  login(@Body() loginDto: UserAuthenticationDto) {
    return this.authService.login(loginDto);
  }

  @UseInterceptors(LogoutInterceptor)
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @UseInterceptors(LoginInterceptor)
  @Post('/register')
  register(@Body() registerDto: User.Infrastructure.Dtos.CreateUserDto) {
    return this.authService.register(registerDto);
  }
}

import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';
import { AuthenticationService } from './auth.service';

const { StatusCodeInterceptor, LoginInterceptor, LogoutInterceptor } = NestModules.Interceptors;

@UseInterceptors(StatusCodeInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  //TODO: completar el login endpoint.
  @UseInterceptors(LoginInterceptor)
  @Post('/login')
  login(@Body() loginDto: User.Infrastructure.Dtos.UserAuthenticationDto) {
    return this.authenticationService.login(loginDto);
  }

  //TODO: completed the logout endpoint.
  @UseInterceptors(LogoutInterceptor)
  @Post('/logout')
  logout() {
    return this.authenticationService.logout();
  }

  //TODO: completar el register endpoint.
  @Post('/register')
  register(@Body() registerDto: User.Infrastructure.Dtos.CreateUserDto) {
    return this.authenticationService.register(registerDto);
  }
}

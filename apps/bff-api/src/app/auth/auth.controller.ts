import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';
import { AuthenticationService } from './auth.service';

const { StatusCodeInterceptor } = NestModules.Interceptors;

@UseInterceptors(StatusCodeInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  //TODO: completar el login endpoint.
  @Post('/login')
  login(@Body() loginDto: User.Infrastructure.Dtos.UserAuthenticationDto) {
    return this.authenticationService.login(loginDto);
  }

  //TODO: completar el logout endpoint.
  //TODO: create the logout dto.
  //TODO: add the logout service.
  @Post('/logout')
  logout(@Body() logoutDto: any) {
    return logoutDto;
  }

  //TODO: completar el register endpoint.
  @Post('/register')
  register(@Body() registerDto: User.Infrastructure.Dtos.CreateUserDto) {
    return this.authenticationService.register({ registerDto });
  }
}

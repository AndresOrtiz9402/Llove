import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';
import { UserService } from './user.service';

const { SpaceCleanPipe } = NestModules.Pipes;
const { StatusCodeInterceptor } = NestModules.Interceptors;

@UseInterceptors(StatusCodeInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/example-method')
  geExampleMethod(@Query() query: unknown) {
    return this.userService.exampleMethod(query);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }

  //TODO: completar el login endpoint.
  @Get('/login')
  login(@Headers('email') email: string) {
    const loginDto: User.Infrastructure.Dtos.UserAuthenticationDto = { email };
    return loginDto;
    /* return this.userService.login(loginDto); */
  }

  //TODO: completar el logout endpoint.
  @Post('/logout')
  logout(logoutDto: any /* TODO: User.Infrastructure.Dtos.LogoutDto */) {
    return logoutDto;
  }

  //TODO: completar el register endpoint.
  @Post('/register')
  register(@Body() registerDto: User.Infrastructure.Dtos.CreateUserDto) {
    return this.userService.register({ registerDto });
  }

  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(SpaceCleanPipe)
    updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    return this.userService.updateById(id, updateInput);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';
import { UserService } from './user.service';
import { IAuth } from '@llove/models';

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

  @Delete()
  deleteById(@Session() session: IAuth.Session) {
    const id = session.user.sub;

    return this.userService.deleteById(id);
  }

  @Patch(':id')
  updateById(
    @Session() session: IAuth.Session,
    @Body(SpaceCleanPipe)
    updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    const id = session.user.sub;

    return this.userService.updateById(id, updateInput);
  }
}

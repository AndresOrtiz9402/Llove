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
  deleteById(@Session() session: { sub: number }) {
    const id = session.sub;

    return this.userService.deleteById(id);
  }

  @Patch(':id')
  updateById(
    @Session() session: { sub: number },
    @Body(SpaceCleanPipe)
    updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    const id = session.sub;

    return this.userService.updateById(id, updateInput);
  }
}

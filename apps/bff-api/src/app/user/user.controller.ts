import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

  //TODO: put the user ID into the header.
  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }

  //TODO: put the user ID into the header.
  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(SpaceCleanPipe)
    updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    return this.userService.updateById(id, updateInput);
  }
}

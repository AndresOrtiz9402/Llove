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
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';

import { User } from '@llove/product-domain/backend';
import { NestModules } from '@llove/backend';

const { StatusCodeInterceptor } = NestModules.Interceptors;

@UseInterceptors(StatusCodeInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteById(id);
  }

  @Get('all')
  async findAll() {
    return await this.userService.getAll();
  }

  @Get('/findOne')
  async findOne(@Headers() headers: { email: string }) {
    const findUserDto: User.Infrastructure.Dtos.UserAuthenticationDto = { email: headers.email };

    return this.userService.findOne(findUserDto);
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    return await this.userService.updateById(id, updateInput);
  }
}

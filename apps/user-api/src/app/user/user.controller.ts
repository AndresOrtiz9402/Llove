import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '@llove/product-domain/backend';

import { NestModules } from '@llove/backend';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  async findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    return this.userService.updateById(id, updateInput);
  }
}

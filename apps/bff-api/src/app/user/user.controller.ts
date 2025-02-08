import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  createUser(
    @Body(SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
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

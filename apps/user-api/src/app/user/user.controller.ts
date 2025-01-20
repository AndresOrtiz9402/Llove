import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '@llove/product-domain/backend';

import { NestModules } from '@llove/backend';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('find-all')
  async findAll() {
    return await this.userService.findUsers();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
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
    return this.userService.userCreate(createUserDto);
  }
}

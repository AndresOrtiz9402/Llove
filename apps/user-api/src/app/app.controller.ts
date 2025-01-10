import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { User } from '@llove/models';

import { UserDto } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  findUserById(
    @Body() reqFindByIdDto: UserDto
  ): Promise<User.infrastructure.UserResponse> {
    const { id } = reqFindByIdDto;
    return this.appService.findById({ id });
  }
}

import { Body, Controller, Delete, Patch, UseGuards, UseInterceptors } from '@nestjs/common';

//libs
import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

//modules
import { UserService } from './user.service';

//constants
const {
  Decorators: { GetUser },
  Guards: { JwtAuthGuard },
  Interceptors: { StatusCodeInterceptor },
  Pipes: { SpaceCleanPipe },
} = NestModules;

//controller
@UseInterceptors(StatusCodeInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete()
  deleteById(@GetUser('sub') userId: number) {
    return this.userService.deleteById(userId);
  }

  @Patch()
  updateById(
    @GetUser('sub') userId: number,
    @Body(SpaceCleanPipe)
    updateInput: User.Infrastructure.Dtos.UpdateUserDto
  ) {
    return this.userService.updateById(userId, updateInput);
  }
}

import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { UserService } from './user.service';

import { User, Shared } from '@llove/product-domain/backend';

import { NestModules } from '@llove/backend';

type CreateErrors = Shared.Infrastructure.Typeorm.Errors.CreateErrors;

const { mappedErrors } = Shared.Infrastructure.Typeorm.Errors;

const casIn = NestModules.Interceptors.caseIn;

const { getResultOrError } = new NestModules.Interceptors.OutcomeInterceptor(mappedErrors, casIn);

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto,
    @Res() httpResponseServices: Response
  ) {
    const result = await this.userService.create(createUserDto);

    getResultOrError({
      result,
      httpStatusIfSuccess: HttpStatus.CREATED,
      httpResponseServices,
      options: {
        leftHandler: error => (error as CreateErrors).code ?? 500,
      },
    });
  }

  @Get('all')
  async findAll(@Res() httpResponseServices: Response) {
    const result = await this.userService.getAll();

    getResultOrError({
      result,
      httpStatusIfSuccess: HttpStatus.FOUND,
      httpResponseServices,
      options: {
        leftHandler: error => (error === '404' ? 404 : 500),
      },
    });
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number, @Res() httpResponseServices: Response) {
    const result = await this.userService.getById(id);

    getResultOrError({
      result,
      httpStatusIfSuccess: HttpStatus.FOUND,
      httpResponseServices,
      options: {
        leftHandler: error => (error === '404' ? 404 : 500),
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() httpResponseServices: Response) {
    const result = await this.userService.deleteById(id);

    getResultOrError({
      result,
      httpStatusIfSuccess: HttpStatus.OK,
      httpResponseServices,
      options: {
        inputHandler(value) {
          return value.status === 'success' && value.data.affected === 0
            ? { status: 'fail', error: '404' }
            : value;
        },
        leftHandler: error => (error === '404' ? 404 : 500),
      },
    });
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInput: User.Infrastructure.Dtos.UpdateUserDto,
    @Res() httpResponseServices: Response
  ) {
    const result = await this.userService.updateById(id, updateInput);

    getResultOrError({
      result,
      httpStatusIfSuccess: HttpStatus.FOUND,
      httpResponseServices,
      options: {
        inputHandler(value) {
          return value.status === 'success' && value.data.affected === 0
            ? { status: 'fail', error: '404' }
            : value;
        },
        leftHandler: error => (error === '404' ? 404 : 500),
      },
    });
  }
}

import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

import { type User } from '@llove/models';

import { Infrastructure } from '../../../shared';

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const { name } =
  new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
    ['name'],
    stringPattern,
    'field cannot contain special characters or start empty'
  );

export type UpdateUserDto = User.Interface.UpdateUserDto;

export class UpdateInputDto implements Omit<UpdateUserDto, 'id'> {
  @IsString(name.isStringMessage)
  @Matches(name.matches.pattern, name.matches.message)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { type IUser } from '@llove/models';

import { Infrastructure } from '../../../shared';

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const { name, email } = new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
  ['name', 'email'],
  stringPattern,
  'field cannot contain special characters or start empty'
);

export class CreateUserDto implements IUser.Infrastructure.CreateUserDto {
  @IsNotEmpty(name.isNotEmptyMessage)
  @IsString(name.isStringMessage)
  @Matches(name.matches.pattern, name.matches.message)
  name: string;

  @IsNotEmpty(email.isNotEmptyMessage)
  @IsEmail()
  email: string;
}

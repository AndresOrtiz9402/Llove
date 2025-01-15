import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { type User, Shared as IShared } from '@llove/models';

import { Infrastructure } from '../../../shared';

const { MultiStringFieldsDecoratorsParamsMaker: MultiStringFields } =
  Infrastructure.ClassValidatorHelpers;

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const { name, email } = new MultiStringFields(
  ['name', 'email'],
  stringPattern,
  'field cannot contain special characters or start empty'
);

export class CreateUserDto
  implements Omit<User.UserEntity, IShared.OmitBaseEntity>
{
  @IsNotEmpty(name.isNotEmptyMessage)
  @IsString(name.isStringMessage)
  @Matches(name.matches.pattern, name.matches.matchesMessage)
  name: string;

  @IsNotEmpty(email.isNotEmptyMessage)
  @IsEmail()
  email: string;
}

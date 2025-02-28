import { IsEmail, IsNotEmpty } from 'class-validator';

import { type IUser } from '@llove/models';

export class UserAuthenticationDto implements IUser.Infrastructure.UserAuthenticationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

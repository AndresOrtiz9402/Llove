import { IsInt } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;
}

import { IsString } from 'class-validator';

export class PostLetterDto {
  @IsString()
  message: string;
}

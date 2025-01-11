import { IsString } from 'class-validator';

export class OpenaiCompletionsDto {
  @IsString()
  message: string;
}

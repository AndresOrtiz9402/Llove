import { IsArray } from 'class-validator';

export class OpenaiCompletionsDto {
  @IsArray()
  messages: string;
}

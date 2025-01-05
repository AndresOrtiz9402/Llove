import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReqFindByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

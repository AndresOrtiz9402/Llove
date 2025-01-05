import { IBase } from '../../..';

export interface ILetter extends IBase {
  title: string;
  content: string;
  userId: number;
  letterTypeId: number;
}

import { DataAccess } from '../../shared';
import { Letter } from '..';

export interface GetManyLetterOptions {
  limit: number;
  page: number;
  titleSort: string;
  dateSort: string;
}

export type LetterQueryObj = DataAccess.Query.QueryObj<Letter>;

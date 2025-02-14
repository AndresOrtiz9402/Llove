import type { Repository } from 'typeorm';

import type { ILetter, IShared } from '@llove/models';
import type { LetterEntity } from '../entities';
import { Infrastructure } from '../../../../shared';

export type LetterQueryObj = IShared.DataAccess.Query.QueryObj<LetterEntity>;

export class LetterRepository
  extends Infrastructure.Typeorm.Repositories.TypeormBaseRepository<LetterEntity>
  implements ILetter.LetterRepository
{
  constructor(letterRepository: Repository<LetterEntity>) {
    super(letterRepository);
  }
}

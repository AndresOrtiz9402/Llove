import { Repository } from 'typeorm';

import { type ILetter } from '@llove/models';
import { LetterOptionsEntity } from '../entities';
import { Infrastructure } from '../../../../shared';

export class LetterOptionsRepository
  extends Infrastructure.Typeorm.Repositories.TypeormBaseRepository<LetterOptionsEntity>
  implements ILetter.LetterOptionsRepository
{
  constructor(private readonly letterOptionsRepository: Repository<LetterOptionsEntity>) {
    super(letterOptionsRepository);
  }
}

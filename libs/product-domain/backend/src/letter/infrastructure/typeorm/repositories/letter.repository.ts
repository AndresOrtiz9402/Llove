import { Repository } from 'typeorm';

import { type Letter } from '@llove/models';
import { type LetterEntity } from '../entities';
import { Infrastructure } from '../../../../shared';

export class LetterRepository
  extends Infrastructure.Typeorm.Repositories
    .TypeormBaseRepository<LetterEntity>
  implements Letter.LetterRepository
{
  constructor(private readonly letterRepository: Repository<LetterEntity>) {
    super(letterRepository);
  }
}

import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Shared } from '../../..';

@Entity('letters')
export class LetterEntity
  extends Shared.TypeormBaseEntity
  implements Letter.Entities.LetterEntity
{
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  letterTypeId: number;
}

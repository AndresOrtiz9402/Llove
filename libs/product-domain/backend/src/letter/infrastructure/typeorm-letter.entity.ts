import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { TypeormBaseEntity } from '../../shared';

@Entity('letters')
export class LetterEntity
  extends TypeormBaseEntity
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

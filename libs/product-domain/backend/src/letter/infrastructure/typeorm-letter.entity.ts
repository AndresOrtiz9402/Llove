import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { TypeormBaseEntity } from '../../shared';

@Entity('letters')
export class LetterEntity
  extends TypeormBaseEntity
  implements Letter.LetterEntity
{
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @Column({ name: 'userId', type: 'int' })
  userId: number;

  @Column({ name: 'letter-type-id', type: 'int' })
  letterTypeId: number;
}

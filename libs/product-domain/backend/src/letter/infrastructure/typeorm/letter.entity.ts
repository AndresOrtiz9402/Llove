import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Shared } from '../../..';

const { TypeormBaseEntity } = Shared.infrastructure.typeorm;

@Entity('letters')
export class LetterEntity
  extends TypeormBaseEntity
  implements Letter.LetterEntity
{
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'letter_type_id', type: 'int' })
  letterTypeId: number;
}

import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Infrastructure } from '../../../../shared';

@Entity('letters')
export class LetterEntity
  extends Infrastructure.Typeorm.Entities.TypeormBaseEntity
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

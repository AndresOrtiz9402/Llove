import { type Letter } from '@llove/models';
import { Column, Entity } from 'typeorm';

import { TypeormBaseEntity } from '../../../shared';

type Letter = Letter.Entities.Letter;

@Entity('letters')
export class LetterEntity extends TypeormBaseEntity implements Letter {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  letterTypeId: number;
}

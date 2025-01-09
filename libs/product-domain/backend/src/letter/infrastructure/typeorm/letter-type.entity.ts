import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Shared } from '../../..';

const { TypeormBaseEntity } = Shared.infrastructure.typeorm;

@Entity('letter_type')
export class LetterTypeEntity
  extends TypeormBaseEntity
  implements Letter.LetterTypeEntity
{
  @Column({ name: 'for', type: 'varchar' })
  for: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;

  @Column({ name: 'relationship', type: 'varchar' })
  relationship: string;

  @Column({ name: 'tone', type: 'varchar' })
  tone: string;
}

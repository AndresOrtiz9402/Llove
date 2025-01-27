import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Infrastructure } from '../../../../shared';

const { TypeormBaseEntity } = Infrastructure.Typeorm.Entities;

@Entity('letter_type')
export class LetterOptionsEntity
  extends TypeormBaseEntity
  implements Letter.LetterOptionsEntity
{
  @Column({ name: 'is_for', type: 'varchar' })
  isFor: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;

  @Column({ name: 'relationship', type: 'varchar' })
  relationship: string;

  @Column({ name: 'tone', type: 'varchar' })
  tone: Letter.LetterToneOptions;
}

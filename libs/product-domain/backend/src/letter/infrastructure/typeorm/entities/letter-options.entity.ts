import { Column, Entity, OneToOne } from 'typeorm';

import { type ILetter } from '@llove/models';
import { Infrastructure } from '../../../../shared';
import { LetterEntity } from './letter.entity';

const { TypeormBaseEntity } = Infrastructure.Typeorm.Entities;

@Entity('letter_options')
export class LetterOptionsEntity extends TypeormBaseEntity implements ILetter.LetterOptions {
  @Column({ name: 'is_for', type: 'varchar' })
  isFor: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;

  @Column({ name: 'relationship', type: 'varchar' })
  relationship: string;

  @Column({ name: 'tone', type: 'varchar' })
  tone: ILetter.LetterToneOptions;

  // Relations
  @OneToOne(() => LetterEntity, letter => letter.letterOptionId)
  letter: LetterEntity;
}

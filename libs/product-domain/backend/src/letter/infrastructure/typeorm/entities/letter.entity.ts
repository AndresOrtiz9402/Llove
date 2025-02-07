import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';

import { type ILetter } from '@llove/models';
import { Infrastructure } from '../../../../shared';
import { LetterOptionsEntity } from './letter-options.entity';

@Entity('letters')
export class LetterEntity
  extends Infrastructure.Typeorm.Entities.TypeormBaseEntity
  implements ILetter.Letter
{
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  // Relation
  @OneToOne(() => LetterOptionsEntity, letterOption => letterOption.id)
  @JoinColumn({ name: 'letter_options_id' })
  letterOption: LetterOptionsEntity;

  @RelationId((letter: LetterEntity) => letter.letterOption)
  @Column({ name: 'letter_options_id' })
  letterOptionId: number;
}

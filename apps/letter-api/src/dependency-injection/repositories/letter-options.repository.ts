import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Letter } from '@llove/product-domain/backend';

type LetterOptionsEntity =
  Letter.Infrastructure.Typeorm.Entities.LetterOptionsEntity;

export const { LetterOptionsEntity } = Letter.Infrastructure.Typeorm.Entities;

@Injectable()
export class LetterOptionsRepository extends Letter.Infrastructure.Typeorm
  .Repository.LetterOptionsRepository {
  constructor(
    @InjectRepository(LetterOptionsEntity)
    private readonly injectedRepository: Repository<LetterOptionsEntity>
  ) {
    super(injectedRepository);
  }
}

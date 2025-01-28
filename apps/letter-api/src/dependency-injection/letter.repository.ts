import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Letter } from '@llove/product-domain/backend';

type LetterEntity = Letter.Infrastructure.Typeorm.Entities.LetterEntity;

export const { LetterEntity } = Letter.Infrastructure.Typeorm.Entities;

@Injectable()
export class LetterRepository extends Letter.Infrastructure.Typeorm.Repository
  .LetterRepository {
  constructor(
    @InjectRepository(LetterEntity)
    private readonly repository: Repository<LetterEntity>
  ) {
    super(repository);
  }
}

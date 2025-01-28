import { Repository } from 'typeorm';

import { type Letter, type Shared } from '@llove/models';
import { LetterEntity } from '../entities';

export type CreateLetterDto = Letter.Interface.CreateLetterDto;
export type UpdateLetterDto = Letter.Interface.UpdateLetterDto;

export class LetterRepository implements Letter.LetterRepository {
  constructor(
    private readonly LetterOptionsRepository: Repository<LetterEntity>
  ) {}

  async create(input: CreateLetterDto): Promise<object> {
    const newLetterOptions = this.LetterOptionsRepository.create(input);

    const res = await this.LetterOptionsRepository.save(newLetterOptions);

    return res;
  }

  async getById(input: Shared.BaseId): Promise<object> {
    const { id } = input;
    return await this.LetterOptionsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<object> {
    return await this.LetterOptionsRepository.find();
  }

  async updateById(input: UpdateLetterDto): Promise<object> {
    const { id, ...updateInput } = input;

    return await this.LetterOptionsRepository.update({ id }, updateInput);
  }

  async deletedById(input: Shared.BaseId): Promise<object> {
    const { id } = input;
    return await this.LetterOptionsRepository.delete(id);
  }
}

import { Repository } from 'typeorm';

import { type Letter, type Shared } from '@llove/models';
import { LetterOptionsEntity } from '../entities';

export type CreateLetterOptionsDto = Letter.Interface.CreateLetterOptionsDto;
export type UpdateLetterOptionsDto = Letter.Interface.UpdateLetterOptionsDto;

export class LetterOptionsRepository implements Letter.LetterOptionsRepository {
  constructor(
    private readonly LetterOptionsRepository: Repository<LetterOptionsEntity>
  ) {}

  async create(input: CreateLetterOptionsDto): Promise<object> {
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

  async updateById(input: UpdateLetterOptionsDto): Promise<object> {
    const { id, ...updateInput } = input;

    return await this.LetterOptionsRepository.update({ id }, updateInput);
  }

  async deletedById(input: Shared.BaseId): Promise<object> {
    return await this.LetterOptionsRepository.delete(input);
  }
}

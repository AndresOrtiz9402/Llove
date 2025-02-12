import { DataSource } from 'typeorm';

import { ILetter } from '@llove/models';
import { LetterEntity, LetterOptionsEntity } from '../entities';

type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

type TransactionResults = ILetter.SaveLetterTransaction.TransactionResults;

export class SaveLetterTransaction implements ILetter.SaveLetterTransaction.Transaction {
  constructor(private readonly dataSource: DataSource) {}
  readonly execute = async (input: SaveLetterInput): Promise<TransactionResults> => {
    try {
      const data = await this.dataSource.manager.transaction(async manager => {
        const { letter, options } = input;

        const letterOptions = manager.create(LetterOptionsEntity, options);
        await manager.save(letterOptions);

        const createdLetter = manager.create(LetterEntity, {
          ...letter,
          letterOptionId: letterOptions.id,
        });
        await manager.save(createdLetter);

        return { letterOptions, createdLetter };
      });

      return { status: 'Transaction committed.', data };
    } catch (error) {
      return { status: 'Transaction rolled back.', error: (error as Error).message };
    }
  };
}

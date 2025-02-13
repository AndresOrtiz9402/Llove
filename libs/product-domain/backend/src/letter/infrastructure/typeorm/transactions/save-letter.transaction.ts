import { DataSource } from 'typeorm';

import { ILetter, IShared } from '@llove/models';
import { LetterEntity, LetterOptionsEntity } from '../entities';

const { COMMITTED, ROLLED_BACK } = IShared.Transactions.TRANSACTION;

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

      return { status: COMMITTED, data };
    } catch (error) {
      return { status: ROLLED_BACK, error: (error as Error).message };
    }
  };
}

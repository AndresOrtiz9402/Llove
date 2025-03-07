import { match, P } from 'ts-pattern';

import { IShared, type ILetter } from '@llove/models';
import { Application } from '../../../shared';

type Committed<R> = IShared.DataAccess.Transactions.Committed<R>;
type Rollback = IShared.DataAccess.Transactions.Rollback;
type SaveLetterOutPut = ILetter.Infrastructure.SaveLetterOutPut;
type TransactionResults = ILetter.SaveLetterTransaction.TransactionResults;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

class TransactionRollback implements Rollback {
  readonly status = IShared.DataAccess.Transactions.TRANSACTION.ROLLED_BACK;
  readonly name = 'Transaction rollback';
  constructor(readonly message: string) {}
}

class TransactionCommitted implements Committed<SaveLetterOutPut> {
  readonly status = IShared.DataAccess.Transactions.TRANSACTION.COMMITTED;
  constructor(readonly data: SaveLetterOutPut) {}
}

const handleLetterApiSaveOutput = (result: SaveLetterOutPut | Error) => {
  return match(result)
    .returnType<TransactionResults>()
    .with(
      { createdLetter: P.not(null), letterOptions: P.not(null) },
      data => new TransactionCommitted(data)
    )
    .with({ message: P.string }, ({ message }) => {
      throw new TransactionRollback(message);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleLetterBffApiSaveLetterOutput = (
  result: IShared.Services.ServiceHandle.Result<TransactionResults>
) => {
  return match(result)
    .with({ statusCode: 201 }, () => result.data)
    .with({ error: P.instanceOf(TransactionRollback) }, ({ error: { message } }) => {
      throw new TransactionRollback(message);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const SAVE_LETTER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleLetterApiSaveOutput,
    errorHandling: {
      errorOutputOption: 'getErrorData',
    },
  },
});

export const BFF_SAVE_LETTER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleLetterBffApiSaveLetterOutput,
    errorHandling: {
      errorOutputOption: 'getErrorData',
    },
  },
});

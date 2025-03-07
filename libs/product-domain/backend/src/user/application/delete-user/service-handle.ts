import { match, P } from 'ts-pattern';
import { DeleteResult } from 'typeorm';

import { IShared } from '@llove/models';
import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormDeleteOutput = (result: DeleteResult) => {
  return match(result)
    .with({ affected: P.when(affected => affected > 0) }, () => result)
    .with({ affected: P.when(affected => affected < 1) }, () => {
      throw new Error(HttpStatus[404]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handlerUserApiDeleteOutput = (
  result: IShared.Services.ServiceHandle.Result<DeleteResult>
) => {
  return match(result)
    .with({ statusCode: 200 }, () => result.data)
    .with({ statusCode: 404 }, () => {
      throw new Error(HttpStatus[404]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const DELETE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handleTypeormDeleteOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

export const BFF_DELETE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handlerUserApiDeleteOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

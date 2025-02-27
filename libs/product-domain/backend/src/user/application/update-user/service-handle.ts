import { match, P } from 'ts-pattern';
import { UpdateResult } from 'typeorm';

import { IShared } from '@llove/models';
import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormUpdateOutput = (result: UpdateResult) => {
  return match(result)
    .with({ affected: P.when(affected => affected > 0) }, () => result)
    .with({ affected: P.when(affected => affected < 1) }, () => {
      throw new Error(HttpStatus[404]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handlerUserApiUpdateOutput = (
  result: IShared.Services.ServiceHandle.Result<UpdateResult>
) => {
  return match(result)
    .with({ statusCode: 200 }, () => result.data)
    .with({ statusCode: 409 }, () => {
      throw new Error(HttpStatus[409]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleTypeormSaveError = (error: unknown) => {
  return match(error)
    .with({ code: '23505' }, () => new Error(HttpStatus[400]))
    .otherwise(() => new Error(HttpStatus[500]));
};

export const UPDATE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handleTypeormUpdateOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
      handleError: handleTypeormSaveError,
    },
  },
});

export const BFF_UPDATE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handlerUserApiUpdateOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

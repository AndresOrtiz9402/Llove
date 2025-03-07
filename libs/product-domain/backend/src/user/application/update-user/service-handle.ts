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

const handleTypeormUpdateError = (error: unknown) => {
  return match(error)
    .with({ code: '23505' }, () => new Error(HttpStatus[409]))
    .with({ message: 'NOT_FOUND' }, () => new Error(HttpStatus[404]))
    .otherwise(() => new Error(HttpStatus[500]));
};

const handleBffApiUserUpdateServiceOutput = (
  result: IShared.Services.ServiceHandle.Result<UpdateResult>
) => {
  return match(result)
    .with({ statusCode: 200 }, () => result.data)
    .with({ statusCode: 409 }, () => {
      throw new Error(HttpStatus[409]);
    })
    .with({ statusCode: 404 }, () => {
      throw new Error(HttpStatus[404]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const UPDATE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handleTypeormUpdateOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
      handleError: handleTypeormUpdateError,
    },
  },
});

export const BFF_UPDATE_USER = new ServiceHandleConfig({
  options: {
    handleOutput: handleBffApiUserUpdateServiceOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

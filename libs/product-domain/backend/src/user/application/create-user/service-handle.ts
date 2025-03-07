import { match, P } from 'ts-pattern';

import { IShared, type IUser } from '@llove/models';
import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormCreateOutput = (result: IUser.User) => {
  return match(result)
    .with({ id: P.not(null) }, () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleTypeormSaveError = (error: unknown) => {
  return match(error)
    .with({ code: '23505' }, () => new Error(HttpStatus[409]))
    .otherwise(() => new Error(HttpStatus[500]));
};

export const CREATE_USER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleTypeormCreateOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
      handleError: handleTypeormSaveError,
    },
  },
});

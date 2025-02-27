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

const UserBffApiCreatedOutput = (
  result: IShared.Services.ServiceHandle.Result<IUser.User>
): IUser.User => {
  return match(result)
    .with({ statusCode: 201 }, () => result.data)
    .with({ statusCode: 409 }, () => {
      throw new Error(HttpStatus[409]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const CREATE_USER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleTypeormCreateOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
      handleError: handleTypeormSaveError,
    },
  },
});

export const BFF_REGISTER_USER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: UserBffApiCreatedOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

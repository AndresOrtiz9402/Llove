import { match, P } from 'ts-pattern';

import { IShared, type IUser } from '@llove/models';
import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormFindAllOutput = (result: IUser.User[]) => {
  return match(result)
    .with(
      P.when(result => result.length > 0),
      () => result
    )
    .with(
      P.when(result => result.length === 0),
      () => {
        throw new Error(HttpStatus[404]);
      }
    )
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const GET_ALL_USERS = new ServiceHandleConfig({
  successCode: HttpStatus.FOUND,
  options: {
    handleOutput: handleTypeormFindAllOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

import { match, P } from 'ts-pattern';

import { IAuth, IShared, IUser } from '@llove/models';
import { Application } from '../../../shared';

type UserAuthenticationDto = IUser.Infrastructure.UserAuthenticationDto;
type HandleTypeormFindOneInput = IShared.Services.ServiceHandle.InputHandler;
type AccessToken = IAuth.AccessToken;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormFindOneInput: HandleTypeormFindOneInput = (
  input: [UserAuthenticationDto]
): [UserAuthenticationDto] => {
  return match(input[0])
    .with({ email: P.string }, () => input)
    .otherwise(() => {
      throw new Error(HttpStatus[400]);
    });
};

const handleTypeormFindOneOutput = (result: IUser.User) => {
  return match(result)
    .with(P.not(null), () => result)
    .with(null, () => {
      throw new Error(HttpStatus[404]);
    })
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleUserBffApiLoginOutput = (result: AccessToken) => {
  return match(result)
    .with({ access_token: P.string }, () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const FIND_USER = new ServiceHandleConfig({
  successCode: HttpStatus.FOUND,
  options: {
    handleInput: handleTypeormFindOneInput,
    handleOutput: handleTypeormFindOneOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

export const BFF_USER_AUTHENTICATION = new ServiceHandleConfig({
  options: {
    handleOutput: handleUserBffApiLoginOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

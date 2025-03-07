import { match, P } from 'ts-pattern';

import { IAuth, IShared, IUser } from '@llove/models';
import { Application } from '../../../shared';

type UserAuthenticationDto = IUser.Infrastructure.UserAuthenticationDto;
type HandleTypeormFindOneInput = IShared.Services.ServiceHandle.InputHandler;
type Credentials = IAuth.Credentials;

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

const handleUserBffApiLoginOutput = (result: Credentials) => {
  return match(result)
    .with({ accessToken: P.string, refreshToken: P.string, session: P.not(null) }, () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

/**
 * The config object for the User findOne handle service decorator.
 */
export const FIND_USER = new ServiceHandleConfig({
  successCode: HttpStatus.FOUND,
  options: {
    handleInput: handleTypeormFindOneInput,
    handleOutput: handleTypeormFindOneOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

/**
 * The config object for the Bff User login and register handle service decorator.
 */
export const BFF_USER_AUTHENTICATION = new ServiceHandleConfig({
  successCode: HttpStatus.OK,
  options: {
    handleOutput: handleUserBffApiLoginOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

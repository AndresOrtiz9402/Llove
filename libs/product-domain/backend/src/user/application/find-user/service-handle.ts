import { match, P } from 'ts-pattern';

import { IShared, IUser } from '@llove/models';
import { Application } from '../../../shared';

type UserAuthenticationDto = IUser.Infrastructure.UserAuthenticationDto;
type HandleTypeormFindOneInput = IShared.Services.ServiceHandle.InputHandler<UserAuthenticationDto>;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleTypeormFindOneInput: HandleTypeormFindOneInput = input => {
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

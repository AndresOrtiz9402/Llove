import { match, P } from 'ts-pattern';

import { IAuth, IShared } from '@llove/models';
import { Application } from '../../../shared';

type Credentials = IAuth.Credentials;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleBffAuthLoginOrRegisterOutput = (result: Credentials) => {
  return match(result)
    .returnType<Credentials>()
    .with({ accessToken: P.not(null), session: P.not(null) }, data => data)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

/**
 * The config object for the Bff Auth login or register handle service decorator.
 */
export const LOGIN_OR_REGISTER = new ServiceHandleConfig({
  successCode: HttpStatus.OK,
  options: {
    handleOutput: handleBffAuthLoginOrRegisterOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

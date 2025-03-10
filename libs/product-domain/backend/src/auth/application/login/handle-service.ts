import { match, P } from 'ts-pattern';

import { IAuth, IShared } from '@llove/models';
import { Application } from '../../../shared';

type Credentials = IAuth.Credentials;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleBffAuthLoginOutput = (result: Credentials) => {
  return match(result)
    .with({ accessToken: P.string, session: P.not(null) }, () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

/**
 * The config object for the Bff Auth login handle service decorator.
 */
export const LOGIN = new ServiceHandleConfig({
  successCode: HttpStatus.OK,
  options: {
    handleOutput: handleBffAuthLoginOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

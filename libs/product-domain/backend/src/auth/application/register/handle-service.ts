import { match, P } from 'ts-pattern';

import { IAuth, IShared } from '@llove/models';
import { Application } from '../../../shared';

type Credentials = IAuth.Credentials;
type Result<R> = IShared.Services.ServiceHandle.Result<R>;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleBffAuthRegisterOutput = (result: Result<Credentials>) => {
  return match(result)
    .returnType<Credentials>()
    .with({ statusCode: 200, data: P.select() }, data => data)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

/**
 * The config object for the Bff Auth register handle service decorator.
 */
export const REGISTER = new ServiceHandleConfig({
  successCode: HttpStatus.OK,
  options: {
    handleOutput: handleBffAuthRegisterOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

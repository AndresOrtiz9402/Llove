import { match, P } from 'ts-pattern';

import { IShared, IUser } from '@llove/models';
import { Application } from '../../../shared';

type UserAuthenticationDto = IUser.Infrastructure.UserAuthenticationDto;
type HandleTypeormFindOneInput = IShared.Services.ServiceHandle.InputHandler;

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

//TODO: Update the output of  the user Bff-Api FindOne service with the token deliver.
const handleUserBffApiFindOneOutput = (
  result: IShared.Services.ServiceHandle.Result<IUser.User>
) => {
  return match(result)
    .with({ statusCode: 302 }, () => result.data)
    .with({ statusCode: 404 }, () => {
      throw new Error(HttpStatus[404]);
    })
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
  successCode: HttpStatus.FOUND,
  options: {
    handleOutput: handleUserBffApiFindOneOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

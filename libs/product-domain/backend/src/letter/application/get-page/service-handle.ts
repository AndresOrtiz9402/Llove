import { match, P } from 'ts-pattern';

import { type ILetter, IShared } from '@llove/models';
import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;

const { ASC, DESC } = IShared.DataAccess.Query.OrderValues;

const { HttpStatus } = IShared.Services.ServiceHandle;

export const makeLetterApiGetManyInput = (input: {
  userId: number;
  options: ILetter.Interfaces.GetManyLetterOptions;
}): ILetter.Interfaces.LetterQueryObj => {
  const {
    userId,
    options: { limit, page, titleSort, dateSort },
  } = input;

  return {
    filter: {
      userId,
    },
    limit: limit < 50 ? limit : 10,
    page,
    sort: {
      title: titleSort === 'd' ? DESC : ASC,
      createdAt: dateSort === 'd' ? DESC : ASC,
    },
  };
};

const handleLetterApiGetManyOutput = (result: ILetter.Letter[]) => {
  return match(result)
    .with(P.array(null), () => {
      throw new Error(HttpStatus[404]);
    })
    .with(P.array(P.not(null)), () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleLetterBffApiGetManyOutput = (
  result: IShared.Services.ServiceHandle.Result<ILetter.Letter[]>
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

export const GET_MANY_LETTERS = new ServiceHandleConfig({
  successCode: HttpStatus.FOUND,
  options: {
    handleOutput: handleLetterApiGetManyOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

export const BFF_GET_MANY_LETTERS = new ServiceHandleConfig({
  successCode: HttpStatus.FOUND,
  options: {
    handleOutput: handleLetterBffApiGetManyOutput,
    errorHandling: {
      errorOptions: 'getHttpException',
    },
  },
});

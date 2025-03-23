import { match, P } from 'ts-pattern';

import { IShared, type ILetter } from '@llove/models';
import { Application } from '../../../shared';

type LetterGeneratorResponse = ILetter.Infrastructure.GenerateLetter.LetterGenerationResponse;

const { ServiceHandleConfig } = Application.ServiceHandle;
const { HttpStatus } = IShared.Services.ServiceHandle;

const handleLetterApiGenerationOutput = (result: LetterGeneratorResponse) => {
  return match(result)
    .returnType<LetterGeneratorResponse>()
    .with({ letter: P.not(null), options: P.not(null) }, () => result)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

const handleLetterBffGenerateOutput = (
  result: IShared.Services.ServiceHandle.Result<LetterGeneratorResponse>
) => {
  return match(result)
    .with({ statusCode: 201 }, () => result.data)
    .otherwise(() => {
      throw new Error(HttpStatus[500]);
    });
};

export const GENERATE_LETTER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleLetterApiGenerationOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

export const BFF_GENERATE_LETTER = new ServiceHandleConfig({
  successCode: HttpStatus.CREATED,
  options: {
    handleOutput: handleLetterBffGenerateOutput,
    errorHandling: {
      errorOutputOption: 'getHttpException',
    },
  },
});

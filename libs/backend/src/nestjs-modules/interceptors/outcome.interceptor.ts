import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

enum ErrorMessage {
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  NotFound = 'Not Found',
  AlreadyExist = 'Already exist',
  InternalServerError = 'Internal Server Error',
  UnknownError = 'Unknown Error',
}

class MappedErrors {
  [key: string | number]: HttpStatus;
}

export const caseIn = {
  [HttpStatus.BAD_REQUEST]: ErrorMessage.BadRequest,
  [HttpStatus.UNAUTHORIZED]: ErrorMessage.Unauthorized,
  [HttpStatus.NOT_FOUND]: ErrorMessage.NotFound,
  [HttpStatus.CONFLICT]: ErrorMessage.AlreadyExist,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ErrorMessage.InternalServerError,
};

type MappedError = { status: HttpStatus; errorMessage: string };

export class ErrorMapper {
  constructor(private readonly map: MappedErrors) {}

  readonly getCode = (errorKey: string | number): HttpStatus => {
    return this.map[errorKey] ?? HttpStatus.INTERNAL_SERVER_ERROR;
  };

  readonly getError = (errorKey: string | number): MappedError => {
    const status = this.getCode(errorKey);
    return { status, errorMessage: caseIn[status] };
  };
}

type FailResult<L> = { status: 'fail'; error: L };

type SuccessResult<R> = { status: 'success'; data: R };

type InitialResult<L, R> = FailResult<L> | SuccessResult<R>;

type LeftHandler = <L>(error: L) => string | number;

type RightHandler = <T, R>(data: T) => R;

const makeFail = <L>(error: L, handler: LeftHandler): string | number =>
  handler ? handler(error as L) : (error as string | number);

const makeSuccess = <T, R>(data: T, handler: RightHandler): T | R =>
  handler ? handler(data) : data;

class MappedMessages {
  [key: string | number]: string;
}

export class OutcomeInterceptor {
  constructor(
    private readonly mapOfHttpCodes: MappedErrors,
    private readonly mapOfResponseMessages: MappedMessages
  ) {}

  readonly getHttpCode = (errorKey: string | number): number => {
    return this.mapOfHttpCodes[errorKey] ?? 500;
  };

  readonly getError = (errorKey: string | number): MappedError => {
    const status = this.getHttpCode(errorKey);
    return { status, errorMessage: this.mapOfResponseMessages[status] };
  };

  readonly getResultOrError = <L, R>(input: {
    result: InitialResult<L, R>;
    httpStatusIfSuccess: number;
    httpResponseServices: Response;
    options?: {
      inputHandler?: (value: InitialResult<L, R>) => InitialResult<L, R>;
      leftHandler?: LeftHandler;
      rightHandler?: RightHandler;
    };
  }) => {
    const { result, httpStatusIfSuccess, httpResponseServices, options } = input;

    const initialResult = options?.inputHandler?.(result) ?? result;

    const { status } = initialResult;

    const adaptedResult =
      status === 'fail'
        ? {
            status,
            error: makeFail(initialResult.error, options?.leftHandler),
          }
        : {
            status,
            data: makeSuccess(initialResult.data, options?.rightHandler),
          };

    if (adaptedResult.status === 'success')
      return httpResponseServices.status(httpStatusIfSuccess).json(adaptedResult);

    if (adaptedResult.status === 'fail') {
      const { status, errorMessage } = this.getError(adaptedResult.error);
      return httpResponseServices.status(status).json(errorMessage);
    }

    return httpResponseServices.status(500).json('Unknown error.');
  };
}

//TODO: convert this into an interceptor.

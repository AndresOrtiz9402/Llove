import { IShared } from '@llove/models';

type Inputs<R = unknown> = IShared.Services.ServiceHandle.Inputs<R>;

export const { HttpStatus } = IShared.Services.ServiceHandle;

class HttpException implements IShared.Services.ServiceHandle.HttpException {
  readonly name: 'Http exception';
  readonly statusCode: number;
  readonly message: string;

  constructor(error: Error) {
    const errorKey = (error as Error)?.message ?? HttpStatus[500];

    const newErrorKey = typeof errorKey === 'string' ? errorKey : HttpStatus[500];

    this.statusCode = HttpStatus[newErrorKey] ?? HttpStatus.INTERNAL_SERVER_ERROR;

    this.message = HttpStatus[this.statusCode];
  }
  stack?: string;
}

type ErrorOutputOptions = IShared.Services.ServiceHandle.ErrorOutputOptions;

const errorOutputOptions: ErrorOutputOptions = {
  getError: (error: Error) => error,
  getErrorMessage: (error: Error) => error.message,
  getHttpException: (error: Error) => new HttpException(error),
  omitError: () => undefined,
};

type MakeError = IShared.Services.ServiceHandle.MakeError;

const makeError: MakeError = ({ error, errorOutputOption }) => {
  return errorOutputOptions[errorOutputOption]?.(error) ?? error;
};

type MakeSuccess = IShared.Services.ServiceHandle.MakeSuccess;

const makeSuccess: MakeSuccess = (result, handler?) => {
  return handler?.(result) || result;
};

type ErrorOptionsOutputs = IShared.Services.ServiceHandle.HandleServiceError;

export class Result<R> implements IShared.Services.ServiceHandle.Result<R> {
  readonly statusCode: number;
  readonly data?: R;
  readonly error?: ErrorOptionsOutputs;

  constructor(input: {
    statusCode: number;
    data?: R;
    errorHandling?: { error?: ErrorOptionsOutputs; getFullLog?: boolean; propertyKey?: string };
  }) {
    const { statusCode, data, errorHandling } = input;
    const { error, getFullLog } = errorHandling || {};

    this.statusCode = statusCode;
    this.data = data;
    this.error = error;

    if (getFullLog === true) {
      console.log(`INSTANCE OF RESULT(${errorHandling.propertyKey}): `, this);
    }
  }
}

type Options<T = unknown, U = T, R = unknown> = IShared.Services.ServiceHandle.Options<T, U, R>;

type Evaluate = IShared.Services.ServiceHandle.Evaluate;

const evaluate: Evaluate =
  <R>(inputs: Inputs<R>, options?: Options<unknown, unknown, R>) =>
  async value => {
    const { getFullLog } = (process.env.NODE_ENV === 'development' && options?.errorHandling) || {};

    const propertyKey = String(options?.errorHandling?.propertyKey || 'unknown');

    if (getFullLog === true) {
      console.log(' ');
      console.log(`\n############ LOG(${propertyKey}): ${new Date().getTime()} ############`);
      console.log('INPUTS: ', value);
    }

    try {
      const { successCode, serviceToHandle } = inputs;

      const result = await serviceToHandle(options?.handleInput?.(value) ?? value);

      if (getFullLog === true) console.log(`RESULT BEFORE HANDLE(${propertyKey}): `, result);

      const data = await makeSuccess(result, options?.handleOutput);

      if (getFullLog === true) console.log(`RESULT AFTER HANDLE(${propertyKey}): `, data);

      return new Result<R>({
        statusCode: successCode,
        data: data as R,
        errorHandling: {
          getFullLog,
          propertyKey,
        },
      });
    } catch (error) {
      const {
        errorOutputOption,
        getFullLog,
        handleError,
        defaultErrorStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      } = options?.errorHandling || {};

      const newError = makeError({
        error: handleError?.(error) ?? error,
        errorOutputOption,
      });

      return new Result<R>({
        statusCode: (newError as HttpException)?.statusCode ?? defaultErrorStatusCode,
        errorHandling: {
          error: newError,
          getFullLog,
          propertyKey,
        },
      });
    }
  };

class EvaluateWithHandlers implements IShared.Services.ServiceHandle.EvaluateWithHandlers {
  constructor(
    private readonly inputs: Inputs,
    private options?: Options
  ) {}

  readonly evaluate = <T>(value?: T[]) => {
    return evaluate(this.inputs, this.options)(value);
  };
}

type MakeHandler = IShared.Services.ServiceHandle.MakeHandler;

const makeHandler: MakeHandler = (inputs, options) => {
  return new EvaluateWithHandlers(inputs, options);
};

type ServiceHandleConfig<R> = IShared.Services.ServiceHandle.ServiceHandleConfig<R>;

type HandleService = IShared.Services.ServiceHandle.HandleService;

/**
 * Decorator to handle the inputs, outputs, and errors of a service.
 *
 * @param config - Configuration object with the success code and the handlers options.
 *
 * @return {Result} - Return a function that wraps the result of the decorated method in an instance of the Result class
 * and pipes handler functions for the input, output, and error handling.
 *
 * @defaultReturn
 * * Result: { statusCode: 200, data: any, error: undefined }
 * * Result: { statusCode: 500, error: Error,  data: undefined }
 */
export function HandleService<R>(config?: ServiceHandleConfig<R>): MethodDecorator {
  const { successCode, options } = config ?? { successCode: HttpStatus.OK, options: {} };

  const { handleInput, handleOutput, errorHandling } = options;

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    if (errorHandling?.getFullLog === true) errorHandling.propertyKey = propertyKey;

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: [unknown]) {
      return await makeHandler(
        {
          serviceToHandle: async args => await originalMethod.apply(this, args),
          successCode,
        },
        { handleInput, handleOutput, errorHandling }
      ).evaluate(args);
    };

    return descriptor;
  };
}

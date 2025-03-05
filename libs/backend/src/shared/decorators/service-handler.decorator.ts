import { IShared } from '@llove/models';

type Inputs<R> = IShared.Services.ServiceHandle.Inputs<R>;

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

type ErrorOptions = IShared.Services.ServiceHandle.ErrorOptions;
const ErrorOptions = {
  getErrorData: (error: Error) => error,
  getErrorMessage: (error: Error) => error.message,
  getHttpException: (error: Error) => new HttpException(error),
  omitError: () => undefined,
};

const makeError: IShared.Services.ServiceHandle.MakeError = ({ error, errorOptions }) => {
  return ErrorOptions[errorOptions]?.(error) ?? error;
};

const makeSuccess: IShared.Services.ServiceHandle.MakeSuccess = (result, handler?) => {
  return handler ? handler(result) : result;
};

type ErrorOptionsOutputs = IShared.Services.ServiceHandle.ErrorOptionsOutputs;

export class Result<R> implements IShared.Services.ServiceHandle.Result<R> {
  readonly statusCode: number;
  readonly data?: R;
  readonly error?: ErrorOptionsOutputs;

  constructor(input: {
    statusCode: number;
    data?: R;
    errorHandling?: { error?: ErrorOptionsOutputs; getFullLog?: boolean };
  }) {
    const { statusCode, data, errorHandling } = input;
    const { error, getFullLog } = errorHandling || {};

    this.statusCode = statusCode;
    this.data = data;
    this.error = error;

    if (getFullLog === true) {
      console.log('INSTANCE OF RESULT: ', this);
    }
  }
}

type Options<R> = IShared.Services.ServiceHandle.Options<R>;

const evaluate: IShared.Services.ServiceHandle.Evaluate =
  <R>(inputs: Inputs<R>, options?: Options<R>) =>
  async (value: [unknown]) => {
    const { getFullLog } = (process.env.NODE_ENV === 'development' && options?.errorHandling) || {};

    if (getFullLog === true) {
      console.log(' ');
      console.log(`\n############ LOG: ${new Date().getTime()} ############`);
      console.log('INPUTS: ', value);
    }

    try {
      const { successCode, serviceToHandle } = inputs;

      const result = await serviceToHandle(options?.handleInput?.(value) ?? value);

      if (getFullLog === true) console.log('RESULT BEFORE HANDLE: ', result);

      const data = await makeSuccess(result, options?.handleOutput);

      if (getFullLog === true) console.log('RESULT AFTER HANDLE: ', data);

      return new Result<R>({
        statusCode: successCode,
        data: data as R,
        errorHandling: {
          getFullLog,
        },
      });
    } catch (error) {
      const {
        errorOptions,
        getFullLog,
        handleError,
        defaultErrorStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      } = options?.errorHandling || {};

      const newError = makeError({
        error: handleError?.(error) ?? error,
        errorOptions: errorOptions,
      });

      return new Result<R>({
        statusCode: (newError as HttpException)?.statusCode ?? defaultErrorStatusCode,
        errorHandling: {
          error: newError,
          getFullLog,
        },
      });
    }
  };

class EvaluateWithHandlers<R> implements IShared.Services.ServiceHandle.EvaluateWithHandlers<R> {
  constructor(private readonly inputs: Inputs<R>, private options?: Options<R>) {}

  readonly evaluate = (value?: [unknown]) => {
    return evaluate(this.inputs, this.options)(value);
  };
}

const makeHandler: IShared.Services.ServiceHandle.MakeHandler = (inputs, options) => {
  return new EvaluateWithHandlers(inputs, options);
};

type ServiceHandleConfig<R> = IShared.Services.ServiceHandle.ServiceHandleConfig<R>;

type HandleService = IShared.Services.ServiceHandle.HandleService;
export function HandleService<R>(config: ServiceHandleConfig<R>): MethodDecorator {
  const { successCode, options } = config;

  const { handleInput, handleOutput, errorHandling } = options;

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: [unknown]) {
      return await makeHandler<unknown>(
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

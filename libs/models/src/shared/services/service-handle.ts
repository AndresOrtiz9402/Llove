/**
 * The success code of the HandleService.
 */
export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

/**
 * The HTTP exception class of the HandleService.
 */
export interface HttpException extends Error {
  name: 'Http exception';
  statusCode: number;
}

/**
 * The success code of the HandleService.
 */
type SuccessCode = number;

/**
 * The inputs of the HandleService.
 */
export interface Inputs<R> {
  serviceToHandle: (value: [unknown]) => R;
  successCode?: SuccessCode;
}

/**
 * The error options of the HandleService.
 */
export interface ErrorOutputOptions {
  /**
   * @param error Any instance of Error.
   *
   * @returns Returns the error.
   */
  getErrorData: (error: Error) => Error;

  /**
   * @param error Any instance of Error with a message.
   *
   * @returns Returns the error message.
   */
  getErrorMessage: (error: Error) => string;

  /**
   * @param error An instance of Error with a key of the HttpStatus enum as message.
   *
   * @returns gets the message of an instance of Error and uses to returns an http exception base on the entries
   * of the HttpStatus Enum
   */
  getHttpException: (error: Error) => HttpException;

  /**
   * Omit the error.
   */
  omitError: () => undefined;
}

/**
 * The error output types of the HandleService.
 */
export type HandleServiceError = Error | HttpException | string | undefined;

/**
 * The input handler.
 */
export type InputHandler = (input: [unknown]) => [unknown];

/**
 * The output handler.
 */
export type OutputHandler<R> = (result: R) => unknown;

/**
 * The error handler.
 */
export type ErrorHandler = (error: unknown) => Error;

/**
 * The error handling options.
 */
interface ErrorHandling {
  /**
   * The error output option.
   *
   * @argument getErrorData - Returns the error.
   *
   * @argument getErrorMessage - Returns the error message.
   *
   * @argument getHttpException - Gets the message of an instance of Error and uses to returns an http exception base
   * on the entries of the HttpStatus Enum.
   *
   * @example
   * const throwANotFoundException = () =>{
   *  throw new Error("NOT_FOUND");
   * }
   * //The return will be a HttpException with the status code 404.
   *
   * @argument omitError - Omit the error.
   *
   * @default outputOption "getErrorData"
   *
   */
  errorOutputOption?: keyof ErrorOutputOptions;

  /**
   * Change the default error status code.
   *
   * @default defaultErrorStatusCode 500
   */
  defaultErrorStatusCode?: number | 500;

  /**
   * The 'getFullLog' option.
   *
   * If true, it returns a complete log of the inputs, the result before and after being handled,
   * and the instance of the Result class, whether it contains the data or an error.
   *
   * @default getFullLog false
   */
  getFullLog?: boolean;

  /**
   * Pipe a function to handle the cached error.
   */
  handleError?: ErrorHandler;
}

/**
 * Options for the HandleService.
 */
export interface Options<R> {
  /**
   * The error handling options.
   */
  errorHandling?: ErrorHandling;
  /**
   * The input handler.
   */
  handleInput?: InputHandler;
  /**
   * The output handler.
   */
  handleOutput?: OutputHandler<R>;
}

/**
 * The input of the MakeError function.
 */
interface MakeErrorInput {
  error: Error;
  errorOutputOption?: keyof ErrorOutputOptions;
}

/**
 * The MakeError function.
 */
export type MakeError = (input: MakeErrorInput) => HandleServiceError;

/**
 * The MakeSuccess function.
 */
export type MakeSuccess = <R>(result: R, handler?: OutputHandler<R>) => unknown;

/**
 * The Result class interface.
 */
export interface Result<R> {
  statusCode: number;
  data?: R;
  error?: HandleServiceError;
}

/**
 * The Evaluate function.
 */
export type Evaluate = <R>(
  inputs: Inputs<R>,
  options?: Options<R>
) => (value: unknown) => Promise<Result<R>>;

/**
 * The EvaluateWithHandlers class interface.
 */
export interface EvaluateWithHandlers<R> {
  evaluate: (value?: [unknown]) => Promise<Result<R>>;
}

/**
 * The MakeHandler function.
 */
export type MakeHandler = <R>(inputs: Inputs<R>, options?: Options<R>) => EvaluateWithHandlers<R>;

/**
 * The HandleServiceConfig class interface.
 */
export interface ServiceHandleConfig<R> {
  /**
   * The success code of the HandleService. It defaults to 200 if not provided.
   *
   *  @default successCode 200
   */
  successCode: SuccessCode;
  /**
   * The options of the HandleService.
   *
   * @default options {}
   */
  options: Options<R>;
}

/**
 * Decorator to handle the service.
 *
 * @param config - Configuration object with the success code and the handlers options.
 *
 * @return {Result} - Returns a function that wraps the result of the decorated method in an instance of the Result class
 * and pipes handler functions for the input, output, and error handling.
 */
export type HandleService = <R>(config?: ServiceHandleConfig<R>) => MethodDecorator;

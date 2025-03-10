import { IShared } from '@llove/models';

type Options<R> = IShared.Services.ServiceHandle.Options<unknown, unknown, R>;

/**
 * The class that represents the configuration of the service handle.
 */
export class ServiceHandleConfig<R>
  implements IShared.Services.ServiceHandle.ServiceHandleConfig<R>
{
  readonly successCode: number | 200;
  readonly options: Options<R>;
  /**
   * @param successCode The success code of the service handle. It defaults to 200 if not provided.
   *
   * @param options The options of the service handle.
   */
  constructor(inputs?: {
    /**
     * The success code of the service handle. It defaults to 200 if not provided.
     *
     *  @default successCode 200
     */
    successCode?: number;
    /**
     * The options of the service handle.
     *
     * @default options {}
     */
    options?: Options<R>;
  }) {
    const { successCode = 200, options = {} } = inputs || {};

    this.successCode = successCode;

    this.options = options;
  }
}

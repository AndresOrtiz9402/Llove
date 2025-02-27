import { IShared } from '@llove/models';

export class ServiceHandleConfig<R>
  implements IShared.Services.ServiceHandle.ServiceHandleConfig<R>
{
  readonly successCode: number | 200;
  readonly options: IShared.Services.ServiceHandle.Options<R>;

  constructor(inputs?: {
    successCode?: number;
    options?: IShared.Services.ServiceHandle.Options<R>;
  }) {
    const { successCode = 200, options = {} } = inputs || {};

    this.successCode = successCode;

    this.options = options;
  }
}

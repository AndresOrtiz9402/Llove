import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;

export const BFF_EXAMPLE_METHOD = new ServiceHandleConfig({
  options: {
    errorHandling: {
      getFullLog: true,
      errorOutputOption: 'getHttpException',
    },
  },
});

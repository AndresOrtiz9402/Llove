import { Application } from '../../../shared';

const { ServiceHandleConfig } = Application.ServiceHandle;

export const BFF_EXAMPLE_METHOD = new ServiceHandleConfig({
  options: {
    errorHandling: {
      getFullError: true,
      errorOptions: 'getHttpException',
    },
  },
});

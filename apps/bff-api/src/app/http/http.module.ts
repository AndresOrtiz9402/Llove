import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        const axiosConfig: AxiosRequestConfig = {
          validateStatus: () => true,
        };
        return {
          ...axiosConfig,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [HttpModule],
})
export class HttpSetupModule {}

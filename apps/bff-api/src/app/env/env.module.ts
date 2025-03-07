import { Global, Module } from '@nestjs/common';

import { BffEnv } from '../../config';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [BffEnv],
  exports: [BffEnv],
})
export class EnvModule {}

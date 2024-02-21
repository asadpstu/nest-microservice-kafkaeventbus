import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }), 
    ConfigModule.forRoot({ isGlobal: true }),
    ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

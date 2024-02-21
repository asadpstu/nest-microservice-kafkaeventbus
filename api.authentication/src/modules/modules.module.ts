import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { DatabaseModule } from '@modules/database/database.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { MessageModule } from '@modules/message/message.module';

@Module({
  imports: [DatabaseModule, HealthModule, AuthenticationModule, UserModule, MessageModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}

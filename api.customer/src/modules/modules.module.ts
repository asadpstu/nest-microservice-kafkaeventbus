import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthenticationModule, CustomerModule, MessageModule],
})
export class ModulesModule {}

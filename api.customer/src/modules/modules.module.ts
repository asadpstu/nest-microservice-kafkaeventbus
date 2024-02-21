import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CustomerModule } from '@modules/customer/customer.module';

@Module({
  imports: [AuthenticationModule, CustomerModule],
})
export class ModulesModule {}

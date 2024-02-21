import { Module } from '@nestjs/common';

import { CustomerController } from '@modules/customer/controllers/customer.controller';
import { RedirectsModule } from '@modules/redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [CustomerController],
})
export class CustomerModule {}

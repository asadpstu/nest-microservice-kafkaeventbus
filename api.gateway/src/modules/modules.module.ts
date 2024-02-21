import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { ProductModule } from '@modules/product/product.module';
import { HealthModule } from '@modules/health/health.module';
import { CartModule } from '@modules/cart/cart.module';
import { CustomerModule } from '@modules/customer/customer.module';

@Module({
  imports: [AuthenticationModule, CustomerModule, CartModule, ProductModule, HealthModule],
})
export class ModulesModule {}

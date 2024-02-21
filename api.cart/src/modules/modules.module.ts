import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CartModule } from '@modules/cart/cart.module';

@Module({
  imports: [ AuthenticationModule, CartModule],
})
export class ModulesModule {}

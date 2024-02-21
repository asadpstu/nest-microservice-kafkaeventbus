import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CartModule } from '@modules/cart/cart.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ AuthenticationModule, CartModule, MessageModule],
})
export class ModulesModule {}

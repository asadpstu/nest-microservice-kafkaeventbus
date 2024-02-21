import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  CartRepository,
  CartProductRepository,
} from '@modules/cart/repositories';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { EventController } from '@modules/cart/controllers/event.controller';
import { CartService } from '@modules/cart/services/cart.service';
import { MessageModule } from '@modules/message/message.module';

const loadRepositories = TypeOrmModule.forFeature([
  CartRepository,
  CartProductRepository,
]);

@Module({
  imports: [loadRepositories, MessageModule],
  controllers: [CartController, EventController],
  providers: [CartService],
  exports: [CartService, loadRepositories],
})
export class CartModule {}

import { Module } from '@nestjs/common';

import { ProductController } from '@modules/product/controllers/product.controller';
import { EventController } from '@modules/product/controllers/event.controller';
import { ProductService } from '@modules/product/services/product.service';
import { MessageModule } from '@modules/message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [ProductController, EventController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}

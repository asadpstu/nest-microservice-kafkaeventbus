import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  CustomerRepository
} from '@modules/customer/repositories';
import { CustomerController } from '@modules/customer/controllers/customer.controller';
import { EventController } from '@modules/customer/controllers/event.controller';
import { CustomerService } from '@modules/customer/services/customer.service';
import { MessageModule } from '@modules/message/message.module';
import { LoggerModule } from '@modules/logger/logger.module';

const loadRepositories = TypeOrmModule.forFeature([
  CustomerRepository,
]);

@Module({
  imports: [loadRepositories, MessageModule, LoggerModule],
  controllers: [CustomerController, EventController],
  providers: [CustomerService],
  exports: [CustomerService, loadRepositories],
})
export class CustomerModule {}

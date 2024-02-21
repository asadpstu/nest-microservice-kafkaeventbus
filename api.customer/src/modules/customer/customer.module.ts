import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  CustomerRepository
} from '@modules/customer/repositories';
import { CustomerController } from '@modules/customer/controllers/customer.controller';
import { CustomerService } from '@modules/customer/services/customer.service';

const loadRepositories = TypeOrmModule.forFeature([
  CustomerRepository,
]);

@Module({
  imports: [loadRepositories],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService, loadRepositories],
})
export class CustomerModule {}

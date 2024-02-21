import { Repository, EntityRepository } from 'typeorm';

import { CustomerEntity } from '@modules/customer/entities/customer.entity';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {}

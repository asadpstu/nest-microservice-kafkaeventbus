import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CustomerRepository,
} from '@modules/customer/repositories';
import {
  CreateCustomerDto,
  CustomerDto,
} from '@modules/customer/dtos';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { AppError } from '@shared/errors/app.error';
import { LoggerService } from '@modules/logger/logger/logger.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly CustomerRepository: CustomerRepository,
    private readonly logger: LoggerService
  ) {}

  async addCustomer(
    user: IAuthUser,
    { fullname, address, is_active }: CustomerDto,
  ): Promise<CreateCustomerDto> {

    const foundCustomer = await this.CustomerRepository.findOne({
      where: {
        user_id: user.sub,
      },
    });

    if (foundCustomer) {
      this.logger.warn(`Customer profile already available for userId: ${user.sub}`)
      throw new AppError(HttpStatus.CONFLICT, 'Customer profile already available.');
    }

    const newCustomer = await this.CustomerRepository.save({
      user_id : user.sub,
      fullname: fullname,
      address: address,
      is_active: is_active,
    });  
    this.logger.log(`Customer profile added for userId : ${user.sub}`)
    return CreateCustomerDto.factory(newCustomer);
  }

}

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

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly CustomerRepository: CustomerRepository,
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
      throw new AppError(HttpStatus.CONFLICT, 'Customer profile already available.');
    }

    const newCustomer = await this.CustomerRepository.save({
      user_id : user.sub,
      fullname: fullname,
      address: address,
      is_active: is_active,
    });  

    return CreateCustomerDto.factory(newCustomer);
  }

}

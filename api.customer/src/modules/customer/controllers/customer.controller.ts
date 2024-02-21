import {
  Controller,
  Post,
  Headers,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateCustomerDto,
  CustomerDto
} from '@modules/customer/dtos';
import { CustomerService } from '@modules/customer/services/customer.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { HeaderDto } from '@shared/dtos/header.dto';

@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly CustomerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: CreateCustomerDto })
  addCustomerProfile(
    @Headers() headers: HeaderDto,
    @Body() cartDto: CustomerDto,
  ) {
    return this.CustomerService.addCustomer(headers.user, cartDto);
  }

}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import {
  CreateCustomerDto,
  CustomerDto,
} from '@modules/customer/dtos';
import { RedirectService } from '@modules/redirects/services/redirect.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@Controller('customers')
@ApiTags('customers')
@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly redirectService: RedirectService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: CreateCustomerDto })
  addCustomerProfile(@Req() request: Request, @Body() body: CustomerDto) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_CUSTOMER_URL}/customers`,
    );
  }
}

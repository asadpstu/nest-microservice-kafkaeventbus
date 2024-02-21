import { ApiProperty } from '@nestjs/swagger';

import { CustomerEntity } from '@modules/customer/entities';

export class CreateCustomerDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    example: 'Text',
  })
  fullname: string;

  @ApiProperty({
    example: 'Text',
  })
  address: string;

  @ApiProperty({
    example: true,
  })
  is_active: boolean;

  static factory({ id, user_id, fullname, address, is_active }: CustomerEntity): CreateCustomerDto {
    return {
      id,
      user_id,
      fullname,
      address,
      is_active
    };
  }
}

import { ApiProperty } from '@nestjs/swagger';

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
}

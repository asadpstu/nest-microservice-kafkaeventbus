import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
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

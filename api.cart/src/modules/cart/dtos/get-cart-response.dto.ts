import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CartEntity, CartProductEntity } from '@modules/cart/entities';

class GetCartProductResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  quantity: number;
}

export class GetCartResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  cartId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: [GetCartProductResponseDto],
  })
  products: GetCartProductResponseDto[];

  static factory(
    cart: CartEntity,
    cartProducts: CartProductEntity[],
  ): GetCartResponseDto {
    const products: GetCartProductResponseDto[] =
      cartProducts.map((cartProduct) => {
        return {
          productId: cartProduct.productId,
          quantity: cartProduct.quantity,
        };
      }) || [];

    const dto: GetCartResponseDto = {
      cartId: cart.id,
      userId: cart.userId,
      products,
    };

    return dto;
  }
}

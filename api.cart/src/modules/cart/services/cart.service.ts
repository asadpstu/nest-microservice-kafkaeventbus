import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CartRepository,
  CartProductRepository,
} from '@modules/cart/repositories';
import {
  AddProductToCartDto,
  CreateCartDto,
  GetCartResponseDto,
  RemoveProductFromCartDto,
} from '@modules/cart/dtos';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { CartEntity } from '@modules/cart/entities/cart.entity';
import { AppError } from '@shared/errors/app.error';
import { LoggerService } from '@modules/logger/logger/logger.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartProductRepository)
    private readonly cartProductRepository: CartProductRepository,
    private readonly logger: LoggerService
  ) {}

  async addProductToCart(
    user: IAuthUser,
    { productId, cartId, quantity }: AddProductToCartDto,
  ): Promise<CreateCartDto> {
    let cart: CartEntity = null;

    if (cartId) {
      cart = await this.cartRepository.findOne({
        where: { id: cartId, isOpened: true },
      });
    } else {
      cart = await this.cartRepository.findOne({
        where: { userId: user.sub, isOpened: true },
      });

      if (!cart) {
        cart = await this.cartRepository.save({
          userId: user.sub,
          isOpened: true,
        });
      }
    }

    if (!cart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found or its closed');
    }

    const foundCartProduct = await this.cartProductRepository.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (foundCartProduct) {
      await this.cartProductRepository.update(
        { cartId: cart.id, productId: productId },
        { ...foundCartProduct, quantity },
      );
    } else {
      await this.cartProductRepository.save({
        cartId: cart.id,
        productId: productId,
        quantity,
      });
    }
    this.logger.log(`productId : ${productId} added to cartId :  ${cart.id} by UserId : ${user.sub}`);
    return CreateCartDto.factory(cart);
  }

  async removeProductFromCart(
    cartId: number,
    user: IAuthUser,
    { productId, quantity }: RemoveProductFromCartDto,
  ) {
    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId, userId: user.sub, isOpened: true },
    });

    if (!foundCart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    const foundCartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!foundCartProduct) {
      throw new AppError(
        HttpStatus.NOT_FOUND,
        'There are no products to remove from this cart',
      );
    }

    if (quantity > foundCartProduct.quantity) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid quantity to remove');
    }

    if (foundCartProduct.quantity === quantity) {
      await this.cartProductRepository.delete({ productId, cartId });
    } else {
      await this.cartProductRepository.update(
        { productId, cartId },
        { ...foundCartProduct, quantity: foundCartProduct.quantity - quantity },
      );
    }
  }

  async getCartById(
    cartId: number,
    user: IAuthUser,
  ): Promise<GetCartResponseDto> {
    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId, userId: user.sub },
    });

    if (!foundCart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    const cartProducts = await this.cartProductRepository.find({
      where: {
        cartId,
      }
    });

    return GetCartResponseDto.factory(foundCart, cartProducts);
  }
}

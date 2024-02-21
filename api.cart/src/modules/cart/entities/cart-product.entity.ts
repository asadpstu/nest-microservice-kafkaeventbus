import {
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

import { CartEntity } from '@modules/cart/entities/cart.entity';

@Entity('cart_product')
export class CartProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => CartEntity)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: CartEntity;
}

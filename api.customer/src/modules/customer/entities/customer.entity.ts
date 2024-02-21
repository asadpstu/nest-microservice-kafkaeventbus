import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@shared/base/base.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'is_active' })
  is_active: boolean;

}

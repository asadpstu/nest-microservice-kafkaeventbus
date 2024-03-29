import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { CartEntity, CartProductEntity } from '@modules/cart/entities';
import { ParseUtil } from '@shared/utils/parse.util';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: ParseUtil.parseBool(process.env.DATABASE_SYNCHRONIZE),
  logging: ParseUtil.parseBool(process.env.DATABASE_LOGGING),
  entities: [CartEntity, CartProductEntity],
};

export default config;

import { HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from '@modules/database/services/database.service';
import { CreateProductDto } from '@modules/product/dtos/create-product.dto';
import { KafkaService } from '@modules/message/services/kafka.service';
import { AppError } from '@shared/errors/app.error';
import { LoggerService } from '@modules/logger/logger/logger.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly kafkaService: KafkaService,
    private readonly logger: LoggerService
  ) {}

  async create({
    description,
    name,
    price,
  }: CreateProductDto): Promise<Product> {
    const productWithSameName = await this.databaseService.product.findFirst({
      where: {
        name,
      },
    });

    if (productWithSameName) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a product with same name',
      );
    }

    const product = await this.databaseService.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    this.kafkaService.emit(process.env.KAFKA_TOPIC, {
      key: `product-${product.id}`,
      value: {
        ...product,
      },
    });
    this.logger.log(`New product added : ${name}`)
    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.databaseService.product.findMany();
  }

  async getById(id: number): Promise<Product> {
    const product = await this.databaseService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');

    return product;
  }
}

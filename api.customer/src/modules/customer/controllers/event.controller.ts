import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { KAFKA_PRODUCT_CREATED_TOPIC } from '@shared/constants';

@Controller()
export class EventController {
  
  @EventPattern('authenticate')
  async authentication(@Payload('value') payload: any) {
    console.log("Kafka authentication event : ", payload)
  }
}

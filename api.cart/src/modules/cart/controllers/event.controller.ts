import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { KAFKA_TOPIC } from '@shared/constants';

export interface IProductPayload {
    id: string;
    name: string;
    price: number;
    description: string;
}

@Controller()
export class EventController {
  @EventPattern(KAFKA_TOPIC)
  async handleProductCreated(@Payload('value') payload: IProductPayload) {
    console.log("Kafka Event: ", payload)
  }
  
  @EventPattern('authenticate')
  async authentication(@Payload('value') payload: any) {
    console.log("Kafka authentication event : ", payload)
  }
}

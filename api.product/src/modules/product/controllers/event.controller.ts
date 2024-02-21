import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class EventController {
  
  @EventPattern('authenticate')
  async authentication(@Payload('value') payload: any) {
    console.log("Kafka authentication event : ", payload)
  }
}

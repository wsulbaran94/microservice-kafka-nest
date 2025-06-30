import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka, // Inject the Kafka service
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-Service]: Received order created event:', order);
    // Here you can add logic to process the order

    this.kafkaService.emit('process-payment', order);
    console.log('[Order-Service]: Emitted order processed event');
  }
}

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

  @MessagePattern('process-payment')
  handlePaymentProcessing(@Payload() paymentData: any) {
    console.log('[Payment-Service]: Received payment processing request:', paymentData);
    // Here you can add logic to process the payment

    this.kafkaService.emit('payment-success', paymentData);
  }
}

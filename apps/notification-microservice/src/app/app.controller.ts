import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  
  @MessagePattern('order-created')
  sendNotificationOrderCreated(@Payload() orderData: any) {
    console.log('[Notification-Service]: Sending notification for order created:', orderData);
    // Here you can add logic to send a notification
  }

  @MessagePattern('payment-success')
  sendNotificationPaymentSuccess(@Payload() paymentData: any) {
    console.log('[Notification-Service]: Sending notification for payment success:', paymentData);
    // Here you can add logic to send a notification
  }
}

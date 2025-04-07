import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from './notifications.type';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @GrpcMethod('NotificationService', 'CreateNotification')
  async createNotification(data: CreateNotificationInput) {
    return this.notificationService.createNotification(data);
  }

  @GrpcMethod('NotificationService', 'UpdateNotification')
  async updateNotification(data: UpdateNotificationInput) {
    return this.notificationService.updateNotification(data);
  }

  @GrpcMethod('NotificationService', 'GetNotification')
  async getNotification(id: string) {
    return this.notificationService.getNotification(id);
  }
}

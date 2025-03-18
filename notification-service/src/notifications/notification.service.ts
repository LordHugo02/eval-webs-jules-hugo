import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from './notifications.type';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async createNotification(
    data: CreateNotificationInput,
  ): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.save(data);
    return notification;
  }

  async updateNotification(
    data: UpdateNotificationInput,
  ): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.save(data);
    return notification;
  }

  async getNotification(id: string): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  }
}

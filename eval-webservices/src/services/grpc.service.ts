import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import { MinioService } from './minio.service';

type Notification = {
  id: string;
  reservationId: number;
  message: string;
  notificationDate: string;
};

type CreateNotificationInput = {
  reservationId: number;
  message: string;
  notificationDate: string;
};

type UpdateNotificationInput = {
  id: string;
  message?: string;
  notificationDate?: string;
};

type GetNotificationInput = {
  id: string;
};

type ExportReservationsInput = {
  userId: number;
};

@Injectable()
export class NotificationGrpcService {
  private readonly PROTO_PATH = path.join(
    __dirname,
    '..',
    'protos',
    'spec.proto',
  );
  private readonly notificationPackage: any;
  private readonly client: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly minioService: MinioService,
  ) {
    const packageDefinition = protoLoader.loadSync(this.PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    this.notificationPackage =
      grpc.loadPackageDefinition(packageDefinition)['notification'];
    this.client = new (this.notificationPackage[
      'NotificationService'
    ] as grpc.ServiceClientConstructor)(
      this.configService.get<string>('GRPC_SERVER_URL', 'localhost:50051'),
      grpc.credentials.createInsecure(),
    );
  }

  createNotification(data: CreateNotificationInput): Promise<Notification> {
    return new Promise((resolve, reject) => {
      this.client.createNotification(
        {
          reservationId: data.reservationId,
          message: data.message,
          notificationDate: data.notificationDate,
        },
        (err: grpc.ServiceError | null, response: Notification) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  updateNotification(data: UpdateNotificationInput): Promise<Notification> {
    return new Promise((resolve, reject) => {
      this.client.updateNotification(
        {
          id: data.id,
          message: data.message,
          notificationDate: data.notificationDate,
        },
        (err: grpc.ServiceError | null, response: Notification) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  getNotification(data: GetNotificationInput): Promise<Notification> {
    return new Promise((resolve, reject) => {
      this.client.getNotification(
        { id: data.id },
        (err: grpc.ServiceError | null, response: Notification) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        },
      );
    });
  }

  async exportReservations(
    data: ExportReservationsInput,
  ): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const exportClient = new (this.notificationPackage[
        'ExportService'
      ] as grpc.ServiceClientConstructor)(
        this.configService.get<string>('GRPC_SERVER_URL', 'localhost:50051'),
        grpc.credentials.createInsecure(),
      );

      exportClient.exportReservations(
        { userId: data.userId },
        async (err: grpc.ServiceError | null, response: { url: string }) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        },
      );
    });
  }
}

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Injectable } from '@nestjs/common';
import path from 'path';

type Notification = {
  id: string;
  reservation_id: string;
  message: string;
  created_at: Date;
};
type CreateNotificationInput = {
  reservation_id: string;
  message: string;
};
type UpdateNotificationInput = {
  id: string;
  reservation_id?: string;
  message?: string;
};
type GetNotificationInput = {
  id: string;
};

@Injectable()
export class NotificationGrpcService {
  PROTO_PATH = path.join(__dirname, 'src', 'protos', 'spec.proto');
  // Adaptez le chemin si nécessaire

  packageDefinition = protoLoader.loadSync(this.PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  protoDescriptor = grpc.loadPackageDefinition(this.packageDefinition);

  notificationPackage = this.protoDescriptor['notification'] as grpc.GrpcObject;

  // -------------------------------------------------------------------
  // 2. Créer un client gRPC vers le StudentService
  // -------------------------------------------------------------------
  client = new (this.notificationPackage[
    'NotificationService'
  ] as grpc.ServiceClientConstructor)(
    'localhost:50051', // Adaptez si le service écoute ailleurs
    grpc.credentials.createInsecure(),
  );

  createNotification(data: CreateNotificationInput): Promise<Notification> {
    return new Promise((resolve, reject) => {
      this.client.createNotification(
        data,
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
        data,
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
        data,
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
}

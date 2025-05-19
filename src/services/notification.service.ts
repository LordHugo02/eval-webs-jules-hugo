import { credentials } from "@grpc/grpc-js";
import { NotificationServiceClient } from "../generated/notification_grpc_pb";
import {
  CreateNotificationRequest,
  Notification,
} from "../generated/notification_pb";

export class NotificationService {
  private client: NotificationServiceClient;

  constructor() {
    this.client = new NotificationServiceClient(
      "localhost:50051",
      credentials.createInsecure()
    );
  }

  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: string
  ): Promise<Notification> {
    return new Promise((resolve, reject) => {
      const request = new CreateNotificationRequest();
      request.setUserId(userId);
      request.setTitle(title);
      request.setMessage(message);
      request.setType(type);

      this.client.createNotification(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async sendReservationNotification(
    userId: string,
    reservationId: string,
    status: string
  ): Promise<void> {
    const title = `Réservation ${status}`;
    const message = `Votre réservation #${reservationId} a été ${status.toLowerCase()}`;

    await this.createNotification(userId, title, message, "RESERVATION");
  }
}

export type Notification = {
  id: string;
  reservation_id: string;
  message: string;
  created_at: Date;
};
export type CreateNotificationInput = {
  reservation_id: string;
  message: string;
};
export type UpdateNotificationInput = {
  id: string;
  reservation_id?: string;
  message?: string;
};
export type GetNotificationInput = {
  id: string;
};

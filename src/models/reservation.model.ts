export interface Reservation {
  id: string;
  userId: string;
  resourceId: string;
  startDate: Date;
  endDate: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

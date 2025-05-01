export type NotificationStatus = 'Success' | 'Failed';

export interface Notification {
  id: number;
  customerId: number;
  description: string;
  status: NotificationStatus;
  paymentId: number;
  successOn: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface NotificationResponse {
  notification: Notification;
  mobile: string;
}

export interface NotificationStats {
  totalSent: number;
  totalFailed: number;
}
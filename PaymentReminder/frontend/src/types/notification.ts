export type NotificationStatus = 'SENT' | 'FAILED';

export interface Notification {
  id: string;
  customerId: string;
  phoneNumber: string;
  messagePreview: string;
  status: NotificationStatus;
  timestamp: string;
}

export interface NotificationStats {
  totalSent: number;
  totalFailed: number;
}
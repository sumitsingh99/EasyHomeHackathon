import { NotificationResponse } from '../types/notification';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate fetching notifications from API
export const fetchNotifications = async (): Promise<NotificationResponse[]> => {
  // Simulate API call delay
  await delay(800);

  // Return mock data
  return [
    {
      notification: {
        id: 1,
        customerId: 1,
        description: 'Your payment is due in 3 days. Please...',
        status: 'Success',
        paymentId: 101,
        successOn: '2025-04-01T10:30:00Z',
        createdAt: '2025-03-31T10:30:00Z',
        updatedAt: null,
      },
      mobile: '+1 234-567-8901',
    },
    {
      notification: {
        id: 2,
        customerId: 2,
        description: 'Thank you for your recent payment...',
        status: 'Success',
        paymentId: 102,
        successOn: '2025-04-01T09:45:00Z',
        createdAt: '2025-03-31T09:45:00Z',
        updatedAt: null,
      },
      mobile: '+1 234-567-8902',
    },
    {
      notification: {
        id: 3,
        customerId: 3,
        description: 'Your payment reminder could not be delivered...',
        status: 'Failed',
        paymentId: 103,
        successOn: '',
        createdAt: '2025-03-31T09:15:00Z',
        updatedAt: null,
      },
      mobile: '+1 234-567-8903',
    },
    {
      notification: {
        id: 4,
        customerId: 4,
        description: 'We noticed your payment is overdue by 5 days...',
        status: 'Failed',
        paymentId: 104,
        successOn: '',
        createdAt: '2025-03-31T08:30:00Z',
        updatedAt: null,
      },
      mobile: '+1 234-567-8904',
    },
    {
      notification: {
        id: 5,
        customerId: 5,
        description: 'This is a reminder about your upcoming payment...',
        status: 'Success',
        paymentId: 105,
        successOn: '2025-04-01T08:00:00Z',
        createdAt: '2025-03-31T08:00:00Z',
        updatedAt: null,
      },
      mobile: '+1 234-567-8905',
    },
  ];
};

// Simulate retrying a failed notification
export const retryNotification = async (id: string): Promise<boolean> => {
  // Simulate API call delay
  await delay(1000);

  // Simulate 90% success rate for retries
  return Math.random() < 0.9;
};
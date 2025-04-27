import { Notification } from '../types/notification';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate fetching notifications from API
export const fetchNotifications = async (): Promise<Notification[]> => {
  // Simulate API call delay
  await delay(800);
  
  // Return mock data
  return [
    {
      id: '1',
      customerId: 'CUST-001',
      phoneNumber: '+1 234-567-8901',
      messagePreview: 'Your payment is due in 3 days. Please...',
      status: 'SENT',
      timestamp: '2025-04-01T10:30:00Z',
    },
    {
      id: '2',
      customerId: 'CUST-002',
      phoneNumber: '+1 234-567-8902',
      messagePreview: 'Thank you for your recent payment...',
      status: 'SENT',
      timestamp: '2025-04-01T09:45:00Z',
    },
    {
      id: '3',
      customerId: 'CUST-003',
      phoneNumber: '+1 234-567-8903',
      messagePreview: 'Your payment reminder could not be delivered...',
      status: 'FAILED',
      timestamp: '2025-04-01T09:15:00Z',
    },
    {
      id: '4',
      customerId: 'CUST-004',
      phoneNumber: '+1 234-567-8904',
      messagePreview: 'We noticed your payment is overdue by 5 days...',
      status: 'FAILED',
      timestamp: '2025-04-01T08:30:00Z',
    },
    {
      id: '5',
      customerId: 'CUST-005',
      phoneNumber: '+1 234-567-8905',
      messagePreview: 'This is a reminder about your upcoming payment...',
      status: 'SENT',
      timestamp: '2025-04-01T08:00:00Z',
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
import React, { useState } from 'react';
import { formatDistanceToNow } from '../utils/formatters';
import StatusBadge from './ui/StatusBadge';
import RetryButton from './ui/RetryButton';
import RetryModal from './ui/RetryModal';
import { Notification } from '../types/notification';

interface NotificationTableProps {
  notifications: Notification[];
  onRetry: (id: string) => Promise<void>;
}

const NotificationTable: React.FC<NotificationTableProps> = ({ 
  notifications,
  onRetry
}) => {
  const [retryModalOpen, setRetryModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleRetryClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setRetryModalOpen(true);
  };

  const handleRetryConfirm = async () => {
    if (selectedNotification) {
      setRetryModalOpen(false);
      await onRetry(selectedNotification.id);
      setSelectedNotification(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg animate-scale-in bg-white/80 backdrop-blur-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message Preview
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <tr 
                key={notification.id} 
                className="table-row-hover"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{notification.customerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{notification.phoneNumber}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {notification.messagePreview}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={notification.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(notification.timestamp)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {notification.status === 'FAILED' && (
                    <RetryButton 
                      onRetry={() => handleRetryClick(notification)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedNotification && (
        <RetryModal
          isOpen={retryModalOpen}
          customerId={selectedNotification.customerId}
          phoneNumber={selectedNotification.phoneNumber}
          onConfirm={handleRetryConfirm}
          onCancel={() => setRetryModalOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationTable;
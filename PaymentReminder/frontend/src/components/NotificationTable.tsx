import React, { useState } from 'react';
import { formatDistanceToNow } from '../utils/formatters';
import StatusBadge from './ui/StatusBadge';
import InfoButton from './ui/InfoButton'; // Replace RetryButton with InfoButton
import InfoModal from './ui/InfoModal'; // Replace RetryModal with InfoModal
import { Notification } from '../types/notification';

interface NotificationTableProps {
  notifications: Notification[];
  onRetry: (id: string) => Promise<void>;
}

const NotificationTable: React.FC<NotificationTableProps> = ({ 
  notifications,
  onRetry
}) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false); // Replace retryModalOpen with infoModalOpen
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleInfoClick = (notification: Notification) => { // Replace handleRetryClick with handleInfoClick
    setSelectedNotification(notification);
    setInfoModalOpen(true);
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
                  <InfoButton 
                    onInfo={() => handleInfoClick(notification)} // Replace RetryButton with InfoButton
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedNotification && (
        <InfoModal // Replace RetryModal with InfoModal
          isOpen={infoModalOpen} // Replace retryModalOpen with infoModalOpen
          customerId={selectedNotification.customerId}
          phoneNumber={selectedNotification.phoneNumber}
          messagePreview={selectedNotification.messagePreview} // Add messagePreview to modal
          status={selectedNotification.status} // Add status to modal
          timestamp={selectedNotification.timestamp} // Add timestamp to modal
          onClose={() => setInfoModalOpen(false)} // Replace onCancel with onClose
        />
      )}
    </>
  );
};

export default NotificationTable;
import React, { useState } from 'react';
import { formatDistanceToNow } from '../utils/formatters';
import StatusBadge from './ui/StatusBadge';
import InfoButton from './ui/InfoButton';
import InfoModal from './ui/InfoModal';
import { NotificationResponse } from '../types/notification';

interface NotificationTableProps {
  notifications: NotificationResponse[];
  onRetry: (id: number) => Promise<void>;
}

const NotificationTable: React.FC<NotificationTableProps> = ({ 
  notifications,
  onRetry
}) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationResponse | null>(null);

  const handleInfoClick = (notification: NotificationResponse) => {
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
                Mobile
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
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
                key={notification.notification.id} 
                className="table-row-hover"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{notification.notification.customerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{notification.mobile}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {notification.notification.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={notification.notification.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(notification.notification.successOn)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <InfoButton 
                    onInfo={() => handleInfoClick(notification)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedNotification && (
        <InfoModal
          isOpen={infoModalOpen}
          notificationId={selectedNotification.notification.id}
          onClose={() => setInfoModalOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationTable;
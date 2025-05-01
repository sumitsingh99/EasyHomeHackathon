import React from 'react';
import { NotificationStatus } from '../../types/notification';

interface StatusBadgeProps {
  status: NotificationStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center";
  
  if (status === 'Success') {
    return (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
        SUCCESS
      </span>
    );
  } else {
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>
        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
        FAILED
      </span>
    );
  }
};

export default StatusBadge;
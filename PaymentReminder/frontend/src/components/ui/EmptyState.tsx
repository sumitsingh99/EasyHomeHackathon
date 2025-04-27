import React from 'react';
import { MessagesSquare } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No notifications found' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-gray-500">
      <MessagesSquare size={48} className="mb-4 opacity-40" />
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm mt-2">Try adjusting your filters or check back later</p>
    </div>
  );
};

export default EmptyState;
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onRetry: () => Promise<void>;
  disabled?: boolean;
}

const RetryButton: React.FC<RetryButtonProps> = ({ onRetry, disabled = false }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (isRetrying || disabled) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <button
      onClick={handleRetry}
      disabled={isRetrying || disabled}
      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded
        ${isRetrying || disabled 
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors'
        }`}
    >
      <RefreshCw 
        size={14} 
        className={`mr-1.5 ${isRetrying ? 'animate-spin' : ''}`} 
      />
      {isRetrying ? 'Retrying...' : 'Retry'}
    </button>
  );
};

export default RetryButton;
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface RetryModalProps {
  customerId: string;
  phoneNumber: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const RetryModal: React.FC<RetryModalProps> = ({
  customerId,
  phoneNumber,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in-up"
        style={{ 
          animation: 'fadeInUp 0.3s ease-out forwards',
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <AlertTriangle className="text-yellow-600" size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Confirm Retry</h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mt-4 mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to retry sending a WhatsApp notification to:
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p><span className="font-medium">Customer ID:</span> {customerId}</p>
            <p><span className="font-medium">Phone Number:</span> {phoneNumber}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetryModal;
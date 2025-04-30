import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  customerId: string;
  phoneNumber: string;
  messagePreview: string;
  status: string;
  timestamp: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  messagePreview,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Message Conversation</h2>
        <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
          {/* Example chat bubbles */}
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>Customer:</strong> {messagePreview}</p>
          </div>
          <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>You:</strong> Thank you for reaching out! How can I assist you?</p>
          </div>
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>Customer:</strong> I have a question about my payment reminder.</p>
          </div>
          <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>You:</strong> Sure! Could you please provide more details?</p>
          </div>
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>Customer:</strong> I received a reminder, but I already made the payment.</p>
          </div>
          <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-xs shadow">
            <p><strong>You:</strong> Thank you for letting us know. We’ll verify and update our records.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          ></button>
            Close
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

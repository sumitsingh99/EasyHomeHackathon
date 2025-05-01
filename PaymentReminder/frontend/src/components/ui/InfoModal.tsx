import React, { useState, useEffect } from 'react';
import { getMessages } from '../../services/notificationService';

interface InfoModalProps {
  isOpen: boolean;
  notificationId: string; // Added notificationId prop
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  notificationId,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<{ messageFrom: string; messageText: string }[]>([]); // Adjusted state type
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);

      // Fetch messages when modal is opened
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessages(notificationId);
          console.log('Fetched messages:', fetchedMessages);
          setMessages(
            fetchedMessages.data.map((msg: any) => ({
              messageFrom: msg.messageFrom,
              messageText: msg.messageText,
            }))
          ); // Extract relevant fields
          setError(null);
        } catch (err) {
          setError('Failed to load messages');
        }
      };

      fetchMessages();
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, notificationId]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-transform duration-300 ${
          isAnimating ? 'scale-100' : 'scale-95'
        }`}
      >
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Message Conversation</h2>
        <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.messageFrom !== 'BOT'
                    ? 'self-start bg-gray-200 text-gray-800'
                    : 'self-end bg-blue-600 text-white'
                } px-4 py-2 rounded-2xl max-w-xs shadow`}
              >
                <p>{message.messageText}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded border-2 border-blue-600 shadow-md transition-all duration-300 ease-in-out transform hover:bg-white hover:text-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
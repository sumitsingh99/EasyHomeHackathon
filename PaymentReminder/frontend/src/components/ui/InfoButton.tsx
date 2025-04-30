import React from 'react';

interface InfoButtonProps {
  onInfo: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onInfo }) => {
  return (
    <button
      onClick={onInfo}
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      Info
    </button>
  );
};

export default InfoButton;

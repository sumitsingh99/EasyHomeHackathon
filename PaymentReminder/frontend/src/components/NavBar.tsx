import React from 'react';
import { RefreshCw, MessageSquare } from 'lucide-react';

interface NavBarProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onRefresh, isRefreshing }) => {
  return (
    <header className="glass-effect shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center animate-slide-in">
            <div className="p-2 rounded-lg bg-blue-100 mr-3">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              WhatsApp Recovery Follow-up
            </h1>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`button-hover flex items-center px-4 py-2 rounded-lg text-sm font-medium
              ${isRefreshing
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
          >
            <RefreshCw 
              size={16} 
              className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
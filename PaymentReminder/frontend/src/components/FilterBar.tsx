import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  statusFilter: string;
  searchQuery: string;
  onStatusFilterChange: (status: string) => void;
  onSearchQueryChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  searchQuery,
  onStatusFilterChange,
  onSearchQueryChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search customer ID or phone number..."
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Status:</span>
        </div>
        
        <div className="flex rounded-lg overflow-hidden shadow-sm">
          {['All', 'Success', 'Failed'].map((status) => (
            <button
              key={status}
              onClick={() => onStatusFilterChange(status)}
              className={`px-4 py-2 text-sm font-medium transition-transform duration-200 ${
                statusFilter === status
                  ? 'bg-blue-500 text-white shadow-inner transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:scale-105'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
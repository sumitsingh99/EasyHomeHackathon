import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import NotificationTable from './NotificationTable';
import StatsOverview from './StatsOverview';
import LoadingSpinner from './ui/LoadingSpinner';
import EmptyState from './ui/EmptyState';
import Toast from './ui/Toast';

const Dashboard: React.FC = () => {
  const {
    notifications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    refreshNotifications,
    isRefreshing,
    stats,
    handleRetry,
    toast,
    clearToast,
  } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onRefresh={refreshNotifications} 
        isRefreshing={isRefreshing} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview stats={stats} />
        
        <FilterBar
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          onStatusFilterChange={setStatusFilter}
          onSearchQueryChange={setSearchQuery}
        />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 my-4">
            <div className="flex">
              <div className="text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState 
            message={
              searchQuery || statusFilter !== 'All'
                ? "No notifications match your filters"
                : "No notifications available"
            }
          />
        ) : (
          <NotificationTable 
            notifications={notifications} 
            onRetry={handleRetry}
          />
        )}
      </main>
      
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={clearToast}
        />
      )}
    </div>
  );
};

export default Dashboard;
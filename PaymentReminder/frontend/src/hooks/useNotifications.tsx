import { useState, useEffect, useCallback } from 'react';
import { NotificationResponse, NotificationStats } from '../types/notification';
import { fetchNotifications, retryNotification } from '../services/api';
import { getNotifications } from '../services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<NotificationStats>({
    totalSent: 0,
    totalFailed: 0,
  });
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Load notifications and calculate stats
  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getNotifications();
      console.log('Fetched notifications:', data);
      setNotifications(data);

      console.log("lol", notifications);

      // Calculate stats
      const totalSent: number = data.filter((n: NotificationResponse) => n.notification.status === "Success").length;
      const totalFailed = data.filter((n: NotificationResponse) => n.notification.status === "Failed").length;
      setStats({ totalSent, totalFailed });

    } catch (err) {
      setError('Failed to load notifications. Please try again.');
      console.error('Error loading notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...notifications];

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((n) => n.notification.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.notification.customerId.toString().includes(query) ||
          n.mobile.toLowerCase().includes(query)
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, statusFilter, searchQuery]);

  // Initial load
  useEffect(() => {
    loadNotifications();

    // Set up auto-refresh
    const intervalId = setInterval(() => {
      loadNotifications();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [loadNotifications]);

  // Manual refresh
  const refreshNotifications = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await loadNotifications();
    setIsRefreshing(false);
  }, [isRefreshing, loadNotifications]);

  // Retry failed notification
  const handleRetry = useCallback(async (id: number) => {
    try {
      const success = await retryNotification(id.toString());

      if (success) {
        // Update notification in state
        setNotifications((prev) =>
          prev.map((n) =>
            n.notification.id === id
              ? {
                  ...n,
                  notification: {
                    ...n.notification,
                    status: 'Success',
                    updatedAt: new Date().toISOString(),
                  },
                }
              : n
          )
        );

        // Update stats
        setStats((prev) => ({
          totalSent: prev.totalSent + 1,
          totalFailed: prev.totalFailed - 1,
        }));

        // Show success toast
        setToast({
          type: 'success',
          message: 'Notification successfully resent',
        });
      } else {
        // Show error toast
        setToast({
          type: 'error',
          message: 'Failed to resend notification. Please try again.',
        });
      }
    } catch (err) {
      // Show error toast
      setToast({
        type: 'error',
        message: 'An error occurred while retrying. Please try again.',
      });
      console.error('Error retrying notification:', err);
    }
  }, []);

  return {
    notifications: filteredNotifications,
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
    clearToast: () => setToast(null),
  };
};
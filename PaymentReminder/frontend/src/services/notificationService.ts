import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/dashboard/notifications';

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch notifications';
    }
    throw 'An unexpected error occurred';
  }
};

export const getMessages = async (notificationId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${notificationId}/messages`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch messages';
    }
    throw 'An unexpected error occurred';
  }
};
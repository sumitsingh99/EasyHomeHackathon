import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/dashboard';

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    // Extracting the relevant data from the response
    return response.data.data.content.map((item: any) => ({
      notification: item.notification,
      mobile: item.mobile,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch notifications';
    }
    throw 'An unexpected error occurred';
  }
};

export const getMessages = async (notificationId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getMessages?notificationId=${notificationId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch messages';
    }
    throw 'An unexpected error occurred';
  }
};
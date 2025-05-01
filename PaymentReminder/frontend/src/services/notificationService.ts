import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/dashboard/notifications';

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
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
    const response = await axios.get(`${API_BASE_URL}/${notificationId}/getMessages`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch messages';
    }
    throw 'An unexpected error occurred';
  }
};
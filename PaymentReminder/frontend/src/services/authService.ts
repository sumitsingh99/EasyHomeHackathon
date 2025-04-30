import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/auth';

export const signin = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Signin failed';
    }
    throw 'An unexpected error occurred';
  }
};

export const signup = async (userData: { email: string; password: string; name: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Signup failed';
    }
    throw 'An unexpected error occurred';
  }
};

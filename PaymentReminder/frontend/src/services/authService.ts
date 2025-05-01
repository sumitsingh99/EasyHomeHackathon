import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/internal';

export const signin = async (credentials: { userName: string; password: string }) => {
  console.log('Signing in with credentials:', credentials);
  try {
    console.log('Signing in with credentials:', credentials);
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Login failed';
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

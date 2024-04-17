import axios, { AxiosError } from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const registerUser = async (params: {
  username: string;
  password: string;
}) => {
  try {
    const response = await http.post('api/auth/register', params);

    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.data) {
      throw (error as AxiosError).response?.data;
    }

    throw error;
  }
};

export const loginUser = async (params: {
  username: string;
  password: string;
}) => {
  try {
    const response = await http.post('api/auth/login', params);

    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.data) {
      throw (error as AxiosError).response?.data;
    }

    throw error;
  }
};

export const verifyToken = async (params: { token: string }) => {
  try {
    const response = await http.post('api/auth/verifyToken', params);

    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.data) {
      throw (error as AxiosError).response?.data;
    }

    throw error;
  }
};

export const getMeUser = async (params: { userId: string; token: string }) => {
  try {
    const response = await http.post('api/me', params);

    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.data) {
      throw (error as AxiosError).response?.data;
    }

    throw error;
  }
};

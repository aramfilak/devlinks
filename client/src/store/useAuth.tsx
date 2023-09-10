import axios, { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { User } from '../data/types';
import { axiosUser } from '../utils';

interface RequestStatus {
  success: boolean;
  message: string;
}

interface UseAuth {
  authToken: string | null;
  user: User | null;
  singUp: (email: string, password: string) => Promise<RequestStatus>;
  login: (email: string, password: string) => Promise<RequestStatus>;
  authenticate: (endpoint: string, email: string, password: string) => Promise<RequestStatus>;
  getUser: () => Promise<RequestStatus>;
  updateUser: (updates: Partial<User>) => Promise<RequestStatus>;
  uploadImage: (data: FormData) => Promise<RequestStatus>;
}

interface AuthResponse extends AxiosResponse {
  data: {
    message: string;
    user: User | null;
    token: string;
  };
}

const useAuth = create<UseAuth>((set, get) => ({
  authToken: localStorage.getItem('authToken'),
  user: null,

  singUp: async (email: string, password: string) => {
    return await get().authenticate('/signup', email, password);
  },
  login: async (email: string, password: string) => {
    return await get().authenticate('/login', email, password);
  },

  authenticate: async (endpoint: string, email: string, password: string) => {
    try {
      // Send post request server
      const response: AuthResponse = await axiosUser.post(endpoint, {
        email: email,
        password: password,
      });
      // save token
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // save user and token
      const user = response.data.user;

      set({ authToken: token, user: user });

      // return success message
      return { success: true, message: String(response.data.message) };

      // handle error
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = String(error.response?.data.message);
        return { success: false, message: message };
      } else {
        return { success: false, message: 'Error' };
      }
    }
  },
  getUser: async () => {
    try {
      const authToken = get().authToken;
      if (!authToken) {
        throw new Error('Authentication token is missing.');
      }

      const response = await axiosUser.get(`/`, { headers: { Authorization: authToken } });
      const user = response.data;

      set(() => {
        return { user: user };
      });

      return { success: true, message: 'Refresh' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = String(error.response?.data.message);
        return { success: false, message: message };
      } else {
        return { success: false, message: 'Error' };
      }
    }
  },
  updateUser: async (updates: Partial<User>) => {
    try {
      const authToken = get().authToken;
      if (!authToken) {
        throw new Error('Authentication token is missing.');
      }

      const response = await axiosUser.patch('/', updates, {
        headers: { Authorization: authToken },
      });

      const user = response.data.user;

      set({ user: response.data.user });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: 'Invalid changes' };
    }
  },
  uploadImage: async (data: FormData) => {
    try {
      const authToken = get().authToken;
      if (!authToken) {
        throw new Error('Authentication token is missing.');
      }

      const response = await axiosUser.post('/uploads', data, {
        headers: { Authorization: authToken, 'Content-Type': 'multipart/form-data' },
      });

      set({ user: response.data.user });
      return { success: false, message: 'Image uploaded successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to upload the image' };
    }
  },
}));

export { useAuth };

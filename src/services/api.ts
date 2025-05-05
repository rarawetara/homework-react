import axios from 'axios';
import { User, UserInput } from '../types/User';

const API_URL = 'https://68139f6c129f6313e211e01d.mockapi.io/Homework3';

export const api = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
  },

  createUser: async (user: UserInput): Promise<User> => {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
  },
 
  updateUser: async (id: string, user: UserInput): Promise<User> => {
    // MockAPI uses PUT instead of PATCH for updates
    const response = await axios.put<User>(`${API_URL}/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 
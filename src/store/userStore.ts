import { create } from 'zustand';
import { User, UserFilters, UserInput } from '../types/User';
import { api } from '../services/api';

export type SortField = 'name' | 'username' | 'email';
export type SortDirection = 'asc' | 'desc';

// Получаем сохраненный цвет из localStorage или используем значение по умолчанию
const getSavedColor = (): string => {
  const savedColor = localStorage.getItem('userFilterColor');
  return savedColor || '#ffffff';
};

// Получаем сохраненные фильтры
const getSavedFilters = (): UserFilters => {
  const savedFilters = localStorage.getItem('userFilters');
  if (savedFilters) {
    try {
      return JSON.parse(savedFilters);
    } catch (e) {
      console.error('Error parsing saved filters', e);
    }
  }
  return {
    search: '',
    married: null,
  };
};

// Получаем сохраненные настройки сортировки
const getSavedSorting = (): { field: SortField; direction: SortDirection } => {
  const savedSorting = localStorage.getItem('userSorting');
  if (savedSorting) {
    try {
      return JSON.parse(savedSorting);
    } catch (e) {
      console.error('Error parsing saved sorting', e);
    }
  }
  return {
    field: 'name',
    direction: 'asc',
  };
};

interface UserStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  sortField: SortField;
  sortDirection: SortDirection;
  filterColor: string;
  
  // Actions
  fetchUsers: () => Promise<void>;
  createUser: (user: UserInput) => Promise<void>;
  updateUser: (id: string, user: UserInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setFilters: (filters: Partial<UserFilters>) => void;
  setSorting: (field: SortField, direction: SortDirection) => void;
  setFilterColor: (color: string) => void;
  
  // Selectors
  filteredAndSortedUsers: () => User[];
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  filters: getSavedFilters(),
  sortField: getSavedSorting().field,
  sortDirection: getSavedSorting().direction,
  filterColor: getSavedColor(),
  
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await api.getUsers();
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', isLoading: false });
      console.error(error);
    }
  },
  
  createUser: async (user: UserInput) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await api.createUser(user);
      set(state => ({ users: [...state.users, newUser], isLoading: false }));
    } catch (error) {
      set({ error: 'Failed to create user', isLoading: false });
      console.error(error);
    }
  },
  
  updateUser: async (id: string, user: UserInput) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await api.updateUser(id, user);
      set(state => ({
        users: state.users.map(u => u.id === id ? updatedUser : u),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update user', isLoading: false });
      console.error(error);
    }
  },
  
  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteUser(id);
      set(state => ({
        users: state.users.filter(u => u.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete user', isLoading: false });
      console.error(error);
    }
  },
  
  setFilters: (filters: Partial<UserFilters>) => {
    set(state => {
      const newFilters = { ...state.filters, ...filters };
      // Сохраняем фильтры в localStorage
      localStorage.setItem('userFilters', JSON.stringify(newFilters));
      return { filters: newFilters };
    });
  }, 
  
  setSorting: (field: SortField, direction: SortDirection) => {
    // Сохраняем настройки сортировки в localStorage
    localStorage.setItem('userSorting', JSON.stringify({ field, direction }));
    set({ sortField: field, sortDirection: direction });
  },
  
  setFilterColor: (color: string) => {
    // Сохраняем цвет в localStorage
    localStorage.setItem('userFilterColor', color);
    set({ filterColor: color });
  },
  
  filteredAndSortedUsers: () => {
    const { users, filters, sortField, sortDirection } = get();
    
    // Filter users
    let result = [...users];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.username.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.married !== null) {
      result = result.filter(user => user.married === filters.married);
    }
    
    // Sort users
    result.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    return result;
  }
})); 
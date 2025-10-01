// Core API service for handling HTTP requests
import { API_ENDPOINTS } from '../config';

export const apiService = {
  get: async <T>(url: string): Promise<T> => {
    try {
      // In a real application, this would be a fetch call to the backend
      // For now, we'll just simulate a response
      return new Promise(resolve => {
        setTimeout(() => {
          // Mock data based on URL
          const mockData = getMockData(url);
          resolve(mockData as T);
        }, 300);
      });
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw error;
    }
  },
  
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      // In a real application, this would be a fetch call to the backend
      return new Promise(resolve => {
        setTimeout(() => {
          // Mock response
          resolve({ success: true, ...data } as T);
        }, 300);
      });
    } catch (error) {
      console.error(`Error posting to ${url}:`, error);
      throw error;
    }
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      // In a real application, this would be a fetch call to the backend
      return new Promise(resolve => {
        setTimeout(() => {
          // Mock response
          resolve({ success: true, ...data } as T);
        }, 300);
      });
    } catch (error) {
      console.error(`Error putting to ${url}:`, error);
      throw error;
    }
  },

  delete: async <T>(url: string): Promise<T> => {
    try {
      // In a real application, this would be a fetch call to the backend
      return new Promise(resolve => {
        setTimeout(() => {
          // Mock response
          resolve({ success: true } as T);
        }, 300);
      });
    } catch (error) {
      console.error(`Error deleting from ${url}:`, error);
      throw error;
    }
  },
};

// Helper function to get mock data based on URL
const getMockData = (url: string) => {
  if (url.includes(API_ENDPOINTS.tables)) {
    return {
      data: Array.from({ length: 24 }, (_, i) => ({
        id: `table-${i + 1}`,
        number: `B${Math.floor(i / 8) + 1}`,
        status: i % 3 === 0 ? 'empty' : i % 5 === 0 ? 'reserved' : 'inUse',
        floor: 1,
      }))
    };
  }
  
  if (url.includes(API_ENDPOINTS.menu)) {
    return {
      data: [
        {
          id: '1',
          name: 'Salad Tuna',
          price: 500670,
          image: '/menu/salad-tuna.jpg',
          category: 'Salad',
          description: 'Thịnh soạn cho bạn',
        },
        {
          id: '2',
          name: 'Salad Egg',
          price: 300990,
          image: '/menu/salad-egg.jpg',
          category: 'Salad',
        },
        {
          id: '3',
          name: 'Wagyu Sate',
          price: 270320,
          image: '/menu/wagyu-sate.jpg',
          category: 'Thịt nướng',
        },
        {
          id: '4',
          name: 'Wagyu Black Paper',
          price: 34980,
          image: '/menu/wagyu-black-paper.jpg',
          category: 'Thịt nướng',
          description: 'Thịnh soạn cho bạn',
        }
      ]
    };
  }
  
  if (url.includes(API_ENDPOINTS.orders)) {
    return {
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `ORD${98 + i}`,
        date: '19/08/2025',
        time: '18:09:22',
        total: 400000,
        status: i % 3 === 0 ? 'completed' : i % 5 === 0 ? 'cancelled' : 'processing',
      }))
    };
  }
  
  // Default empty response
  return { data: [] };
};

export default apiService;
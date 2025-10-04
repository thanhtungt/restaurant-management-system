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
        number: `B${i + 1}`,
        status: 'empty',
        floor: 1,
      }))
    };
  }
  
  // Categories endpoint
  if (url.includes('/categories')) {
    return {
      data: [
        { id: 'donhau', name: 'Đồ nhậu' },
        { id: 'lau', name: 'Lẩu' },
        { id: 'donuong', name: 'Đồ nướng' },
        { id: 'douong', name: 'Đồ uống' },
      ]
    };
  }
  
  if (url.includes(API_ENDPOINTS.menu)) {
    return {
      data: [
        // ===== ĐỒ NHẬU =====
        {
          id: 'dn1',
          name: 'Salad Tuna',
          price: 500670,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
          category: 'donhau',
          description: '(Must choose level)',
        },
        {
          id: 'dn2',
          name: 'Salad Egg',
          price: 300990,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
          category: 'donhau',
        },
        {
          id: 'dn3',
          name: 'Nem rán giòn',
          price: 180000,
          image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop',
          category: 'donhau',
          description: 'Nem rán truyền thống',
        },
        {
          id: 'dn4',
          name: 'Gỏi cuốn tôm thịt',
          price: 150000,
          image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
          category: 'donhau',
        },
        
        
        // ===== LẨU =====
        {
          id: 'lau1',
          name: 'Lẩu Thái',
          price: 800000,
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
          category: 'lau',
          description: 'Chua cay đặc trưng',
        },
        {
          id: 'lau2',
          name: 'Lẩu Hải sản',
          price: 950000,
          image: 'https://images.unsplash.com/photo-1572448862527-d3c904757de6?w=400&h=300&fit=crop',
          category: 'lau',
          description: '(Must choose level)',
        },
        {
          id: 'lau3',
          name: 'Lẩu Nấm',
          price: 650000,
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
          category: 'lau',
        },
        {
          id: 'lau4',
          name: 'Lẩu Bò Mỹ',
          price: 1200000,
          image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
          category: 'lau',
          description: 'Thịnh soạn cho bạn',
        },
        
        // ===== ĐỒ NƯỚNG =====
        {
          id: 'nuong1',
          name: 'Wagyu Sate',
          price: 270320,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
          category: 'donuong',
        },
        {
          id: 'nuong2',
          name: 'Wagyu Black Paper',
          price: 34980,
          image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
          category: 'donuong',
          description: '(Must choose level)',
        },
        {
          id: 'nuong3',
          name: 'Gà nướng muối ớt',
          price: 350000,
          image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
          category: 'donuong',
        },
        {
          id: 'nuong4',
          name: 'Sườn nướng BBQ',
          price: 420000,
          image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
          category: 'donuong',
          description: 'Sốt BBQ đặc biệt',
        },
        {
          id: 'nuong5',
          name: 'Bạch tuộc nướng',
          price: 380000,
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
          category: 'donuong',
        },
        {
          id: 'nuong6',
          name: 'Cá nướng muối',
          price: 450000,
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
          category: 'donuong',
        },
        
        // ===== ĐỒ UỐNG =====
        {
          id: 'uong1',
          name: 'Trà sữa trân châu',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
          category: 'douong',
        },
        {
          id: 'uong2',
          name: 'Sinh tố bơ',
          price: 38000,
          image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop',
          category: 'douong',
        },
        {
          id: 'uong3',
          name: 'Nước ép cam',
          price: 32000,
          image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
          category: 'douong',
        },
        {
          id: 'uong4',
          name: 'Cà phê sữa đá',
          price: 28000,
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
          category: 'douong',
        },
        {
          id: 'uong5',
          name: 'Trà đá chanh',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
          category: 'douong',
        },
        {
          id: 'uong6',
          name: 'Coca Cola',
          price: 20000,
          image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
          category: 'douong',
        },
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
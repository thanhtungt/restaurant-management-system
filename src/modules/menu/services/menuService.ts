import apiService from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../config';
import { MenuItem, MenuCategory } from '../../../types/menu';

export const menuService = {
  getAllMenuItems: async (): Promise<MenuItem[]> => {
    const response = await apiService.get<{ data: MenuItem[] }>(API_ENDPOINTS.menu);
    return response.data;
  },
  
  getMenuItemById: async (id: string): Promise<MenuItem> => {
    const response = await apiService.get<MenuItem>(`${API_ENDPOINTS.menu}/${id}`);
    return response;
  },
  
  getMenuCategories: async (): Promise<MenuCategory[]> => {
    const response = await apiService.get<{ data: MenuCategory[] }>(`${API_ENDPOINTS.menu}/categories`);
    return response.data;
  }
};

export default menuService;
import apiService from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../config';
import { Order } from '../../../types/order';

export const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await apiService.get<{ data: Order[] }>(API_ENDPOINTS.orders);
    return response.data;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiService.get<Order>(`${API_ENDPOINTS.orders}/${id}`);
    return response;
  },
  
  createOrder: async (order: Partial<Order>): Promise<Order> => {
    const response = await apiService.post<Order>(API_ENDPOINTS.orders, order);
    return response;
  },
  
  updateOrder: async (id: string, order: Partial<Order>): Promise<Order> => {
    const response = await apiService.put<Order>(`${API_ENDPOINTS.orders}/${id}`, order);
    return response;
  }
};

export default orderService;
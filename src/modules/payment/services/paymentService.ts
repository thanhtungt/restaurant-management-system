import apiService from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../config';
import { Payment } from '../../../types/payment';

export const paymentService = {
  createPayment: async (payment: Partial<Payment>): Promise<Payment> => {
    const response = await apiService.post<Payment>(API_ENDPOINTS.payments, payment);
    return response;
  },
  
  getPaymentByOrderId: async (orderId: string): Promise<Payment> => {
    const response = await apiService.get<Payment>(`${API_ENDPOINTS.payments}?orderId=${orderId}`);
    return response;
  }
};

export default paymentService;
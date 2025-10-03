import { MenuItem } from './menu';

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // Mã đơn hàng (ORD98, ORD99, etc.)
  tableId: string;
  tableName: string; // B1, B2, etc.
  floor: string; // Tầng
  items: OrderItem[];
  status: 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'failed'; // Trạng thái thanh toán
  createdAt: Date;
  updatedAt: Date;
  total: number;
  discount?: number; // Số tiền giảm giá
  discountCode?: string; // Mã giảm giá
  finalTotal: number; // Tổng sau giảm giá
  paymentMethod?: string; // Tiền mặt, Chuyển khoản
  customerName?: string; // Tên khách hàng
  staffName: string; // Tên nhân viên
  notes?: string; // Ghi chú
}
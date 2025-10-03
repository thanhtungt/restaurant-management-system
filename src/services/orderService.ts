import { Order, OrderItem } from '../types/order';

const ORDERS_STORAGE_KEY = 'restaurant_orders';

export const orderService = {
  // Lấy tất cả đơn hàng
  getAllOrders: (): Order[] => {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!ordersJson) return [];
    
    const orders = JSON.parse(ordersJson);
    // Convert date strings back to Date objects
    return orders.map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }));
  },

  // Lấy đơn hàng theo ID
  getOrderById: (id: string): Order | null => {
    const orders = orderService.getAllOrders();
    return orders.find(order => order.id === id) || null;
  },

  // Tạo mã đơn hàng mới
  generateOrderNumber: (): string => {
    const orders = orderService.getAllOrders();
    const lastOrder = orders[orders.length - 1];
    
    if (!lastOrder) {
      return 'ORD001';
    }
    
    const lastNumber = parseInt(lastOrder.orderNumber.replace('ORD', ''));
    const newNumber = (lastNumber + 1).toString().padStart(3, '0');
    return `ORD${newNumber}`;
  },

  // Lưu đơn hàng mới
  saveOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const orders = orderService.getAllOrders();
    
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      orderNumber: orderService.generateOrderNumber(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    
    return newOrder;
  },

  // Cập nhật đơn hàng
  updateOrder: (id: string, updates: Partial<Order>): Order | null => {
    const orders = orderService.getAllOrders();
    const index = orders.findIndex(order => order.id === id);
    
    if (index === -1) return null;
    
    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return orders[index];
  },

  // Cập nhật trạng thái thanh toán
  updatePaymentStatus: (id: string, paymentStatus: 'unpaid' | 'paid' | 'failed', paymentMethod?: string): Order | null => {
    return orderService.updateOrder(id, {
      paymentStatus,
      paymentMethod,
    });
  },

  // Xóa đơn hàng
  deleteOrder: (id: string): boolean => {
    const orders = orderService.getAllOrders();
    const filtered = orders.filter(order => order.id !== id);
    
    if (filtered.length === orders.length) return false;
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Lấy đơn hàng theo bàn
  getOrdersByTable: (tableId: string): Order[] => {
    const orders = orderService.getAllOrders();
    return orders.filter(order => order.tableId === tableId);
  },

  // Lấy đơn hàng theo trạng thái
  getOrdersByStatus: (status: 'pending' | 'completed' | 'cancelled'): Order[] => {
    const orders = orderService.getAllOrders();
    return orders.filter(order => order.status === status);
  },

  // Lấy đơn hàng theo trạng thái thanh toán
  getOrdersByPaymentStatus: (paymentStatus: 'unpaid' | 'paid' | 'failed'): Order[] => {
    const orders = orderService.getAllOrders();
    return orders.filter(order => order.paymentStatus === paymentStatus);
  },
};

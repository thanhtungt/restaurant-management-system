import { useState, useEffect } from 'react';
import { message } from 'antd';
import { MenuItem } from '../../../types/menu';
import { Table } from '../../../types/table';
import { Order, OrderItem } from '../../../types/order';
import orderService from '../services/orderService';

export const useOrder = (tableId?: string) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [table, setTable] = useState<Table | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Add item to order
  const addItem = (menuItem: MenuItem, quantity: number = 1) => {
    setOrderItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItemIndex > -1) {
        // Update quantity if exists
        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity,
        };
        message.success(`Đã thêm ${menuItem.name}`);
        return updated;
      } else {
        // Add new item
        const newItem: OrderItem = {
          menuItem: menuItem,
          quantity: quantity,
        };
        message.success(`Đã thêm ${menuItem.name}`);
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from order
  const removeItem = (menuItemId: string) => {
    setOrderItems((prevItems) => {
      const item = prevItems.find((i) => i.menuItem.id === menuItemId);
      if (item) {
        message.info(`Đã xóa ${item.menuItem.name}`);
      }
      return prevItems.filter((item) => item.menuItem.id !== menuItemId);
    });
  };

  // Update item quantity
  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }

    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate subtotal for an item
  const calculateItemSubtotal = (item: OrderItem): number => {
    return item.menuItem.price * item.quantity;
  };

  // Calculate total amount
  const calculateTotal = (): number => {
    return orderItems.reduce((total, item) => {
      return total + calculateItemSubtotal(item);
    }, 0);
  };

  // Calculate total items count
  const getTotalItemsCount = (): number => {
    return orderItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Clear all items
  const clearOrder = () => {
    setOrderItems([]);
    setNotes('');
    message.success('Đã xóa tất cả món');
  };

  // Load order from history
  const loadOrderFromHistory = (order: Order) => {
    setOrderItems(order.items);
    setCurrentOrder(order);
    setNotes(order.notes || '');
    message.success(`Đã tải đơn hàng ${order.orderNumber}`);
  };

  // Submit order to API
  const submitOrder = async (): Promise<Order | null> => {
    if (orderItems.length === 0) {
      message.warning('Vui lòng chọn ít nhất một món');
      return null;
    }

    if (!table) {
      message.warning('Vui lòng chọn bàn');
      return null;
    }

    try {
      setLoading(true);

      const orderData: Partial<Order> = {
        tableId: table.id,
        items: orderItems,
        total: calculateTotal(),
        status: 'pending',
      };

      const createdOrder = await orderService.createOrder(orderData);
      setCurrentOrder(createdOrder);
      message.success('Đã tạo đơn hàng thành công!');
      return createdOrder;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể tạo đơn hàng';
      message.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing order
  const updateOrder = async (): Promise<Order | null> => {
    if (!currentOrder) {
      return submitOrder();
    }

    try {
      setLoading(true);

      const orderData: Partial<Order> = {
        items: orderItems,
        total: calculateTotal(),
      };

      const updatedOrder = await orderService.updateOrder(
        currentOrder.id,
        orderData
      );
      setCurrentOrder(updatedOrder);
      message.success('Đã cập nhật đơn hàng!');
      return updatedOrder;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể cập nhật đơn hàng';
      message.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load order by table
  useEffect(() => {
    if (tableId) {
      // Load existing order for this table if any
      // This would require an API endpoint like getOrderByTableId
      // For now, just reset the order
      setOrderItems([]);
      setNotes('');
    }
  }, [tableId]);

  return {
    orderItems,
    table,
    setTable,
    notes,
    setNotes,
    loading,
    currentOrder,
    addItem,
    removeItem,
    updateQuantity,
    calculateItemSubtotal,
    calculateTotal,
    getTotalItemsCount,
    clearOrder,
    submitOrder,
    updateOrder,
    loadOrderFromHistory,
  };
};

export default useOrder;

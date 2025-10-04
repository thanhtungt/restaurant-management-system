import React, { useState, useEffect } from 'react';
import { Button, Empty, Divider, Space, message, App } from 'antd';
import { ShoppingCartOutlined, ClearOutlined, PrinterOutlined, CalendarOutlined, ClockCircleOutlined, ArrowLeftOutlined, CheckCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { Table } from '../../../types/table';
import { OrderItem } from '../../../types/order';
import OrderItemComponent from './OrderItemComponent';
import { orderService } from '../../../services/orderService';
import tableStorageService from '../../../services/tableService';

interface OrderDetailsProps {
  table: Table | null;
  items: OrderItem[];
  total: number;
  itemsCount: number;
  selectedFloor?: string;
  currentOrder?: any; // Đơn hàng hiện tại (từ history)
  showPaymentStatus?: boolean; // Flag để hiển thị banner trạng thái
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearOrder: () => void;
  onPayment: () => void;
  onTableStatusChange?: () => void; // Callback khi cập nhật trạng thái bàn
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  table,
  items,
  total,
  itemsCount,
  selectedFloor = '1',
  currentOrder,
  showPaymentStatus = false,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onPayment,
  onTableStatusChange,
}) => {
  const { message: messageApi } = App.useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add custom scrollbar style
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .order-items-scroll::-webkit-scrollbar {
        width: 6px;
      }
      .order-items-scroll::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 3px;
      }
      .order-items-scroll::-webkit-scrollbar-thumb {
        background: #D5D5D5;
        border-radius: 3px;
      }
      .order-items-scroll::-webkit-scrollbar-thumb:hover {
        background: #BFBFBF;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSaveOrder = () => {
    if (!table || items.length === 0) {
      messageApi.warning('Vui lòng chọn bàn và thêm món ăn');
      return;
    }

    try {
      console.log('Saving order...', { table, items, total, currentOrder });
      
      const discountAmount = 30000; // Có thể thay đổi logic tính giảm giá
      
      let order;
      
      // Kiểm tra xem đã có đơn hàng hiện tại chưa
      if (currentOrder && currentOrder.id) {
        // CẬP NHẬT đơn hàng hiện tại
        console.log('Updating existing order:', currentOrder.orderNumber);
        order = orderService.updateOrder(currentOrder.id, {
          items: items,
          total: total,
          discount: discountAmount,
          finalTotal: total - discountAmount,
        });
        
        if (order) {
          console.log('Order updated successfully:', order.orderNumber);
          messageApi.success(`Đã cập nhật đơn hàng ${order.orderNumber} thành công!`);
        }
      } else {
        // TẠO MỚI đơn hàng
        console.log('Creating new order for table:', table.number);
        order = orderService.saveOrder({
          tableId: table.id,
          tableName: table.number,
          floor: selectedFloor,
          items: items,
          status: 'pending',
          paymentStatus: 'unpaid',
          total: total,
          discount: discountAmount,
          discountCode: 'XVYZ6H',
          finalTotal: total - discountAmount,
          staffName: 'Trần Văn B',
          customerName: 'Lê Thị C',
        });
        
        console.log('Order created successfully:', order.orderNumber);
        messageApi.success(`Đã lưu đơn hàng ${order.orderNumber} thành công!`);
      }
      
      // Cập nhật trạng thái bàn thành "đang dùng"
      const updatedTable = tableStorageService.updateTableStatus(table.id, 'inUse');
      console.log('Table status updated to inUse:', updatedTable);
      
      // Gọi callback để refresh danh sách bàn
      if (onTableStatusChange) {
        onTableStatusChange();
      }
    } catch (error) {
      console.error('Error saving order:', error);
      messageApi.error('Lỗi khi lưu đơn hàng: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // No table selected OR no items - show empty state
  if (!table || items.length === 0) {
    return (
      <div style={{ 
        background: '#fff',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        borderRadius: '20px',
      }}>
        <h2 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '24px', 
          fontWeight: '700',
          color: '#222222',
        }}>
          Đơn hàng
        </h2>
        <p style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '400',
          color: '#948B8B',
          textAlign: 'center',
        }}>
          Vui lòng chọn bàn để bắt đầu tạo đơn hàng
        </p>
      </div>
    );
  }

  // Has items
  return (
    <div style={{ 
      height: '100%', 
      background: '#fff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '20px',
      overflow: 'hidden',
    }}>
      {/* Header Title */}
      <h2 style={{ 
        margin: '0 0 16px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#222222',
        textAlign: 'center',
        flexShrink: 0,
      }}>
        Đơn hàng
      </h2>

        {/* Order Info Box - Bao gồm tất cả thông tin */}
        <div style={{
          padding: '12px 16px',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px dashed #D9D9D9',
          marginBottom: '16px',
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Thông tin đơn hàng */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>Ngày tạo đơn:</span>
              <span style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>{formatDate(currentTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>Thời điểm:</span>
              <span style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>{formatTime(currentTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>Khách hàng:</span>
              <span style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>Lê Thị C</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>Nhân viên:</span>
              <span style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>Trần Văn B</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>Bàn:</span>
              <span style={{ 
                padding: '2px 12px',
                background: '#5296E5',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '400',
              }}>
                {table.number} | Tầng {selectedFloor}
              </span>
            </div>
          </div>

          {/* Đường line phân chia trên món ăn */}
          <Divider style={{ margin: '12px 0', borderColor: '#D9D9D9' }} />

          {/* Items List - Nằm trong box */}
          <div 
            style={{ 
              flex: 1,
              overflowY: 'auto', 
              marginBottom: '12px',
              paddingRight: '8px',
              minHeight: 0,
            }}
            className="order-items-scroll"
          >
            {items.map((item) => (
              <OrderItemComponent
                key={item.menuItem.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>

          {/* Đường line phân chia dưới món ăn */}
          <Divider style={{ margin: '12px 0', borderColor: '#D9D9D9' }} />

          {/* Total Section - Nằm trong box */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#2A3256' }}>Tạm tính:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0088FF' }}>
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#2A3256' }}>Giảm giá:</span>
                <span style={{ 
                  padding: '2px 8px',
                  // background: '#D7D7D7',
                  color: '#000000',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '1px solid #D7D7D7',
                }}>
                  XVYZ6H
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#FF6F68' }}>
                -30.000đ
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#2A3256' }}>Tổng:</span>
              <span style={{ fontSize: '20px', fontWeight: '500', color: '#14933E' }}>
                {(total - 30000).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div style={{ marginTop: '4px', fontSize: '14px', color: '#222222'}}>
              <span style={{ fontWeight: '700' }}>Phương thức thanh toán:</span> <span>{currentOrder?.paymentMethod === 'cash' ? 'Tiền mặt' : currentOrder?.paymentMethod === 'transfer' ? 'Chuyển khoản' : 'chưa có'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showPaymentStatus ? (
          // Khi xem đơn hàng từ lịch sử - hiển thị status và button trên cùng 1 hàng
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
            {/* Payment Status - Left */}
            {currentOrder && (
              <div style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
              }}>
                {currentOrder.paymentStatus === 'paid' ? (
                  <>
                    <CheckCircleOutlined style={{ fontSize: '18px', color: '#14933E' }} />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '700',
                      color: '#14933E',
                    }}>
                      Thanh Toán Thành Công!
                    </span>
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined style={{ fontSize: '18px', color: '#FF6F68' }} />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '700',
                      color: '#FF6F68',
                    }}>
                      Chưa Thanh Toán
                    </span>
                  </>
                )}
              </div>
            )}
            
            {/* Button "Xuất hóa đơn" - Right */}
            <Button
              size="small"
              style={{
                height: '48px',
                fontSize: '17px',
                fontWeight: '700',
                background: '#141A93',
                borderColor: '#141A93',
                color: '#FFFFFF',
                borderRadius: '8px',
                minWidth: '150px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#141A93';
                e.currentTarget.style.borderColor = '#141A93';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#141A93';
                e.currentTarget.style.borderColor = '#141A93';
              }}
            >
              Xuất hóa đơn
            </Button>
          </div>
        ) : (
          // Khi tạo/chỉnh sửa đơn hàng - hiển thị tất cả buttons
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                size="large"
                block
                onClick={handleSaveOrder}
                style={{
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  border: '1px solid #5296E5',
                  background: '#FFFFFF',
                  color: '#222222',
                }}
              >
                Lưu
              </Button>
              <Button
                size="large"
                block
                style={{
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  border: '1px solid #5296E5',
                  background: '#FFFFFF',
                  color: '#222222',
                }}
              >
                Hủy
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                size="large"
                block
                style={{
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: '700',
                  background: '#14933E',
                  borderColor: '#14933E',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#14933E';
                  e.currentTarget.style.borderColor = '#14933E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#14933E';
                  e.currentTarget.style.borderColor = '#14933E';
                }}
              >
                Xuất hóa đơn
              </Button>
              <Button
                type="primary"
                size="large"
                block
                onClick={onPayment}
                style={{
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  background: '#FF5F57',
                  borderColor: '#FF5F57',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF5F57';
                  e.currentTarget.style.borderColor = '#FF5F57';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF5F57';
                  e.currentTarget.style.borderColor = '#FF5F57';
                }}
              >
                Thanh Toán
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};

export default OrderDetails;

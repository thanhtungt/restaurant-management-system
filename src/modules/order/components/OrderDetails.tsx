import React, { useState, useEffect } from 'react';
import { Button, Empty, Divider, Space, message } from 'antd';
import { ShoppingCartOutlined, ClearOutlined, PrinterOutlined, CalendarOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table } from '../../../types/table';
import { OrderItem } from '../../../types/order';
import OrderItemComponent from './OrderItemComponent';
import { orderService } from '../../../services/orderService';

interface OrderDetailsProps {
  table: Table | null;
  items: OrderItem[];
  total: number;
  itemsCount: number;
  selectedFloor?: string;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearOrder: () => void;
  onPayment: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  table,
  items,
  total,
  itemsCount,
  selectedFloor = '1',
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onPayment,
}) => {
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
        background: #0088FF;
        border-radius: 3px;
      }
      .order-items-scroll::-webkit-scrollbar-thumb:hover {
        background: #0066CC;
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
      message.warning('Vui lòng chọn bàn và thêm món ăn');
      return;
    }

    try {
      const discountAmount = 30000; // Có thể thay đổi logic tính giảm giá
      const order = orderService.saveOrder({
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

      message.success(`Đã lưu đơn hàng ${order.orderNumber}`);
      // Có thể gọi onClearOrder() nếu muốn clear sau khi lưu
    } catch (error) {
      message.error('Lỗi khi lưu đơn hàng');
      console.error(error);
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
          color: '#262626',
        }}>
          Đơn hàng
        </h2>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#8c8c8c',
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
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '20px',
    }}>
      {/* Header Title */}
      <h2 style={{ 
        margin: '0 0 20px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#262626',
        textAlign: 'center',
      }}>
        Đơn hàng
      </h2>

        {/* Order Info Box */}
        <div style={{
          padding: '16px',
          background: '#fafafa',
          borderRadius: '12px',
          border: '1px dashed #d9d9d9',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Ngày tạo đơn:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>{formatDate(currentTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Thời điểm:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>{formatTime(currentTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Khách hàng:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>Lê Thị C</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Nhân viên:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>Trần Văn B</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Bàn:</span>
              <span style={{ 
                padding: '4px 12px',
                background: '#1890ff',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                {table.number} Tầng {selectedFloor}
              </span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            marginBottom: '16px',
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

        {/* Total Section */}
        <div style={{ 
          padding: '16px',
          marginBottom: '16px',
          background: '#fafafa',
          borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#595959' }}>Tạm tính:</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#0088FF' }}>
              {total.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#595959' }}>Giảm giá:</span>
              <span style={{ 
                padding: '4px 12px',
                background: '#fff',
                color: '#2A3256',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid #D7D7D7',
              }}>
                XVYZ6H
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#FF6F68' }}>
              -30.000₫
            </div>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#262626' }}>Tổng:</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#52c41a' }}>
              {(total - 30000).toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#8c8c8c' }}>
            <span style={{ fontWeight: '600' }}>Phương thức thanh toán:</span> chưa có
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              size="large"
              block
              onClick={handleSaveOrder}
              style={{
                height: '48px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                background: '#fff',
                color: '#262626',
              }}
            >
              Lưu
            </Button>
            <Button
              size="large"
              block
              style={{
                height: '48px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                background: '#fff',
                color: '#262626',
              }}
            >
              Hủy
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              size="large"
              block
              style={{
                height: '48px',
                fontSize: '15px',
                fontWeight: '600',
                background: '#52c41a',
                borderColor: '#52c41a',
                color: '#fff',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#73d13d';
                e.currentTarget.style.borderColor = '#73d13d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#52c41a';
                e.currentTarget.style.borderColor = '#52c41a';
              }}
            >
              Xuất hóa đơn
            </Button>
            <Button
              type="primary"
              size="large"
              block
              onClick={onPayment}
              danger
              style={{
                height: '48px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
              }}
            >
              Thanh Toán
            </Button>
          </div>
        </div>
    </div>
  );
};

export default OrderDetails;

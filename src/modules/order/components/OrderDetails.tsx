import React, { useState, useEffect } from 'react';
import { Button, Empty, Divider, Space } from 'antd';
import { ShoppingCartOutlined, ClearOutlined, PrinterOutlined, CalendarOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table } from '../../../types/table';
import { OrderItem } from '../../../types/order';
import OrderItemComponent from './OrderItemComponent';

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

  // No table selected OR no items - show same layout
  if (!table || items.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        background: '#f0f0f0',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Top Section: Date/Time Box & Previous Orders Box */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Date & Time Box - Combined */}
          <div style={{
            padding: '16px 20px',
            background: '#fff',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
              <span style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                {formatDate(currentTime)}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ClockCircleOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
              <span style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          {/* Previous Orders Box */}
          <div style={{
            flex: 1,
            padding: '16px 20px',
            background: '#fff',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            cursor: 'pointer',
          }}>
            <ArrowLeftOutlined style={{ fontSize: '18px', color: '#262626' }} />
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#262626',
            }}>
              Đơn hàng trước đó
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div style={{ 
          flex: 1,
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          {/* Empty State */}
          <div style={{ 
            flex: 1,
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '20px', 
              fontWeight: '600',
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
        </div>
      </div>
    );
  }

  // Has items
  return (
    <div style={{ 
      height: '100%', 
      background: '#f0f0f0',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Top Section: Date/Time Box & Previous Orders Box */}
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Date & Time Box - Combined */}
        <div style={{
          padding: '16px 20px',
          background: '#fff',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CalendarOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
            <span style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
              {formatDate(currentTime)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ClockCircleOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
            <span style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Previous Orders Box */}
        <div style={{
          flex: 1,
          padding: '16px 20px',
          background: '#fff',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          cursor: 'pointer',
        }}>
          <ArrowLeftOutlined style={{ fontSize: '18px', color: '#262626' }} />
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#262626',
          }}>
            Đơn hàng trước đó
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div style={{ 
        flex: 1,
        background: '#fff',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
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
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
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
          background: '#fafafa',
          borderRadius: '12px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Tạm tính:</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#1890ff' }}>
              {total.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Giảm giá:</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#ff4d4f' }}>
              XVYZ6H
            </span>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#262626' }}>Tổng:</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#52c41a' }}>
              {total.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#8c8c8c' }}>
            <span style={{ fontWeight: '600' }}>Phương thức thanh toán:</span> chưa có
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <Button
            size="large"
            block
            style={{
              height: '48px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '8px',
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
            }}
          >
            Hủy
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            size="large"
            block
            icon={<PrinterOutlined />}
            style={{
              height: '48px',
              fontSize: '15px',
              fontWeight: '600',
              background: '#52c41a',
              borderColor: '#52c41a',
              color: '#fff',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#73d13d'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#52c41a'}
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

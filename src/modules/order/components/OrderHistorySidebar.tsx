import React, { useState, useEffect } from 'react';
import { Drawer, Card, Tag, Input, Button, DatePicker, Divider } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, CloseOutlined, CalendarOutlined } from '@ant-design/icons';
import { Order } from '../../../types/order';
import { orderService } from '../../../services/orderService';
import dayjs from 'dayjs';

interface OrderHistorySidebarProps {
  visible: boolean;
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
}

const OrderHistorySidebar: React.FC<OrderHistorySidebarProps> = ({
  visible,
  onClose,
  onSelectOrder,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  // Load orders khi component mount
  useEffect(() => {
    const allOrders = orderService.getAllOrders();
    console.log('Initial orders loaded:', allOrders.length);
    setOrders(allOrders);
  }, []);

  // Reload orders mỗi khi sidebar mở để có dữ liệu mới nhất
  useEffect(() => {
    if (visible) {
      const allOrders = orderService.getAllOrders();
      console.log('Reloading orders on sidebar open:', allOrders.length);
      setOrders(allOrders);
    }
  }, [visible]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#27C840';
      case 'failed':
        return '#ff4d4f';
      case 'unpaid':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircleOutlined />;
      case 'failed':
        return <CloseCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrderId(order.id);
    onSelectOrder(order);
    onClose(); // Close sidebar after selecting
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    order.tableName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: '700', color: '#222222' }}>
            Tìm kiếm đơn hàng
          </span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      closeIcon={<CloseOutlined style={{ fontSize: '16px' }} />}
      styles={{
        body: { padding: '16px', background: '#f5f5f5' },
        header: { 
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
        }
      }}
    >
      {/* Search Box */}
      <div style={{ marginBottom: '16px' }}>
        <Input  
          prefix={<SearchOutlined style={{ color: '#000000' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="large"
          style={{
            borderRadius: '16px',
            border: '1px solid #0088FF87',
          }}
        />
      </div>

      {/* Date and Time Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Date Filter - Left with icon prefix */}
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          format="DD/MM/YYYY"
          size="large"
          suffixIcon={null}
          style={{
            borderRadius: '12px',
            width: '160px',
            fontWeight: '700',
          }}
          prefix={<CalendarOutlined style={{ color: '#0088FF', marginRight: '8px' }} />}
        />
        
        {/* Time Filter Buttons - Right */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="large"
            style={{
              background: '#FF9D00',
              borderColor: '#FF9D00',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontWeight: '700',
              minWidth: '90px',
            }}
          >
            17:09:22
          </Button>
          <Button
            size="large"
            style={{
              background: '#F90000',
              borderColor: '#FF0000',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontWeight: '700',
              minWidth: '90px',
            }}
          >
            18:09:22
          </Button>
        </div>
      </div>

      {/* Divider Line */}
      <Divider style={{ margin: '20px 0', borderColor: '#D9D9D9' }} />

      {/* Section Title */}
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#222222', margin: 0 }}>
          Gần đây
        </h3>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredOrders.length === 0 ? (
          <Card
            style={{
              borderRadius: '12px',
              textAlign: 'center',
              padding: '40px 20px',
              
            }}
          >
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: '14px' }}>
              {searchText ? 'Không tìm thấy đơn hàng' : 'Chưa có đơn hàng nào'}
            </p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card
              key={order.id}
              hoverable
              onClick={() => handleOrderClick(order)}
              style={{
                borderRadius: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                border: selectedOrderId === order.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#262626' }}>
                      {order.orderNumber}
                    </span>
                    <Tag
                      style={{
                        background: '#0094FE',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: '700',
                        border: 'none',
                        margin: 0,
                      }}
                    >
                      {order.tableName}
                    </Tag>
                  </div>
                  <div style={{ fontSize: '14px', color: '#000000', fontWeight: '700' }}>
                    {order.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px', justifyContent: 'flex-end' }}>
                    <span
                      style={{
                        fontSize: '14px',
                        color: getPaymentStatusColor(order.paymentStatus),
                      }}
                    >
                      {getPaymentStatusIcon(order.paymentStatus)}
                    </span>
                    <span style={{ fontSize: '14px', color: '#000000', fontWeight: '700' }}>
                      {order.createdAt.toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div style={{fontWeight: '700' }}>
                    <span style={{ fontSize: '14px', color: '#000000' }}>Giá:</span> <span style={{fontSize: '20px', color: '#0088FF' }}>{order.finalTotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Drawer>
  );
};

export default OrderHistorySidebar;

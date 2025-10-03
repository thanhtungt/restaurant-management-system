import React, { useState, useEffect } from 'react';
import { Drawer, Card, Tag, Input, Button } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Order } from '../../../types/order';
import { orderService } from '../../../services/orderService';

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

  useEffect(() => {
    if (visible) {
      // Load orders from localStorage
      const allOrders = orderService.getAllOrders();
      setOrders(allOrders);
    }
  }, [visible]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#52c41a';
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
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#262626' }}>
            Tìm kiếm đơn hàng
          </span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      closeIcon={<CloseOutlined style={{ fontSize: '16px' }} />}
      bodyStyle={{ padding: '16px', background: '#f5f5f5' }}
      headerStyle={{ 
        borderBottom: '1px solid #f0f0f0',
        padding: '16px 24px',
      }}
    >
      {/* Search Box */}
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Tìm kiếm đơn hàng..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="large"
          style={{
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Time Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <Button
          type="primary"
          size="middle"
          style={{
            background: '#faad14',
            borderColor: '#faad14',
            borderRadius: '8px',
            fontWeight: '600',
            flex: 1,
          }}
        >
          {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Button>
        <Button
          danger
          size="middle"
          style={{
            borderRadius: '8px',
            fontWeight: '600',
            flex: 1,
          }}
        >
          {new Date(Date.now() + 3600000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Button>
      </div>

      {/* Section Title */}
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#262626', margin: 0 }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#262626', marginBottom: '4px' }}>
                      {order.orderNumber}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {order.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  <Tag
                    color="blue"
                    style={{
                      borderRadius: '12px',
                      padding: '2px 10px',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: 'none',
                    }}
                  >
                    {order.tableName}
                  </Tag>
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
                    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {order.createdAt.toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0088FF' }}>
                    {order.finalTotal.toLocaleString('vi-VN')}₫
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

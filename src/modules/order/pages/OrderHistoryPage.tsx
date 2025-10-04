import React, { useState } from 'react';
import { Card, Input, Button, Tag, Row, Col, Divider } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Order } from '../../../types/order';

const OrderHistoryPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data - sẽ được thay thế bằng dữ liệu thực từ API/localStorage
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD98',
      tableId: 'table-1',
      tableName: 'B1',
      floor: '1',
      items: [
        {
          menuItem: {
            id: 'm1',
            name: 'Salad Tuna',
            price: 200000,
            description: 'Salad cá ngừ tươi',
            category: 'Món chính',
            image: '',
          },
          quantity: 2,
          notes: '',
        },
        {
          menuItem: {
            id: 'm2',
            name: 'Wagyu Black Paper',
            price: 200000,
            description: 'Thịt bò Wagyu',
            category: 'Món chính',
            image: '',
          },
          quantity: 1,
          notes: '',
        },
      ],
      status: 'completed',
      paymentStatus: 'paid',
      createdAt: new Date('2025-08-19T18:09:22'),
      updatedAt: new Date('2025-08-19T18:09:22'),
      total: 400000,
      discount: 0,
      finalTotal: 400000,
      staffName: 'Trần Văn B',
      customerName: 'Lê Thị C',
      paymentMethod: 'Tiền mặt',
    },
    {
      id: '2',
      orderNumber: 'ORD98',
      tableId: 'table-2',
      tableName: 'B2',
      floor: '1',
      items: [
        {
          menuItem: {
            id: 'm1',
            name: 'Salad Tuna',
            price: 200000,
            description: 'Salad cá ngừ tươi',
            category: 'Món chính',
            image: '',
          },
          quantity: 2,
          notes: '',
        },
      ],
      status: 'completed',
      paymentStatus: 'failed',
      createdAt: new Date('2025-08-19T18:09:22'),
      updatedAt: new Date('2025-08-19T18:09:22'),
      total: 400000,
      discount: 0,
      finalTotal: 400000,
      staffName: 'Trần Văn B',
      customerName: 'Lê Thị C',
      paymentMethod: 'chưa có',
    },
    {
      id: '3',
      orderNumber: 'ORD98',
      tableId: 'table-3',
      tableName: 'B3',
      floor: '1',
      items: [
        {
          menuItem: {
            id: 'm3',
            name: 'Salad Egg',
            price: 200000,
            description: 'Salad trứng',
            category: 'Món chính',
            image: '',
          },
          quantity: 2,
          notes: '',
        },
      ],
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date('2025-08-19T18:09:22'),
      updatedAt: new Date('2025-08-19T18:09:22'),
      total: 400000,
      discount: 0,
      finalTotal: 400000,
      staffName: 'Trần Văn B',
      customerName: 'Lê Thị C',
      paymentMethod: 'chưa có',
    },
  ];

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
    setSelectedOrder(order);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Row gutter={16}>
        {/* Left Column - Orders List */}
        <Col span={10}>
          {/* Header */}
          <Card
            style={{
              marginBottom: '24px',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{ padding: '20px 24px' }}
          >
            <h1 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '700', color: '#222222' }}>
              Tìm kiếm đơn hàng
            </h1>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Input
                prefix={<SearchOutlined style={{ color: '#000000' }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                size="large"
                style={{
                  flex: 1,
                  borderRadius: '16px',
                }}
              />
              <Button
                type="primary"
                size="large"
                style={{
                  background: '#faad14',
                  borderColor: '#faad14',
                  borderRadius: '8px',
                  fontWeight: '600',
                  padding: '0 24px',
                }}
              >
                17:09:22
              </Button>
              <Button
                danger
                size="large"
                style={{
                  borderRadius: '8px',
                  fontWeight: '600',
                  padding: '0 24px',
                }}
              >
                18:09:22
              </Button>
            </div>
          </Card>

          {/* Orders List */}
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#262626', marginBottom: '12px' }}>
              Gần đây
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((order) => (
              <Card
                key={order.id}
                hoverable
                onClick={() => handleOrderClick(order)}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  border: selectedOrder?.id === order.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                }}
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#262626', marginBottom: '4px' }}>
                        {order.orderNumber}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8c8c8c' }}>
                        {order.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    <Tag
                      color="blue"
                      style={{
                        borderRadius: '12px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: 'none',
                      }}
                    >
                      {order.tableName}
                    </Tag>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                        <span style={{ fontSize: '13px', color: '#8c8c8c' }}>
                          {order.createdAt.toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#0088FF' }}>
                        Giá: {order.finalTotal.toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>

        {/* Right Column - Order Detail */}
        <Col span={14}>
          {selectedOrder ? (
            <Card
              style={{
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <h2 style={{
                margin: '0 0 20px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: '#262626',
                textAlign: 'center',
              }}>
                Đơn hàng
              </h2>

              {/* Order Info */}
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
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                      {selectedOrder.createdAt.toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Khách hàng:</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                      {selectedOrder.customerName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Thư ngân:</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                      Lê Thị C
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Nhân viên:</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                      {selectedOrder.staffName}
                    </span>
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
                      {selectedOrder.tableName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              {selectedOrder.items.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px 0',
                        gap: '16px',
                        borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}
                    >
                      {/* Food Image */}
                      <div
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                        }}
                      >
                        🍽️
                      </div>

                      {/* Food Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#262626',
                          marginBottom: '8px',
                        }}>
                          {item.menuItem.name} - <span style={{ color: '#ff8800' }}>{item.menuItem.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            disabled
                            style={{
                              width: '24px',
                              height: '24px',
                              minWidth: '24px',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#1890ff',
                              borderColor: '#1890ff',
                              fontSize: '12px',
                            }}
                          >
                            -
                          </Button>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#262626',
                            minWidth: '20px',
                            textAlign: 'center',
                          }}>
                            {item.quantity}
                          </span>
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            disabled
                            style={{
                              width: '24px',
                              height: '24px',
                              minWidth: '24px',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#1890ff',
                              borderColor: '#1890ff',
                              fontSize: '12px',
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#0088FF',
                        minWidth: '100px',
                        textAlign: 'right',
                      }}>
                        {(item.menuItem.price * item.quantity).toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Section */}
              <div style={{
                padding: '16px',
                marginBottom: '16px',
                background: '#fafafa',
                borderRadius: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#262626' }}>Tạm tính:</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#262626' }}>
                    0
                  </span>
                </div>
                {selectedOrder.discount && selectedOrder.discount > 0 ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#262626' }}>Giảm giá:</span>
                      {selectedOrder.discountCode && (
                        <span style={{
                          padding: '4px 12px',
                          background: '#fff',
                          color: '#2A3256',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          border: '1px solid #D7D7D7',
                        }}>
                          {selectedOrder.discountCode}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ff4d4f' }}>
                      -{selectedOrder.discount.toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                ) : null}
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#262626' }}>Tổng:</span>
                  <span style={{ fontSize: '22px', fontWeight: '700', color: '#52c41a' }}>
                    {selectedOrder.finalTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#8c8c8c' }}>
                  <span style={{ fontWeight: '600' }}>Phương thức thanh toán:</span> {selectedOrder.paymentMethod || 'chưa có'}
                </div>
              </div>

              {/* Payment Status */}
              {selectedOrder.paymentStatus === 'paid' ? (
                <div style={{
                  padding: '20px',
                  background: '#f6ffed',
                  border: '1px solid #b7eb8f',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#52c41a' }}>
                    Thanh Toán Thành Công!
                  </span>
                </div>
              ) : (
                <div style={{
                  padding: '20px',
                  background: '#fff2f0',
                  border: '1px solid #ffccc7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#ff4d4f' }}>
                    Chưa Thanh Toán
                  </span>
                </div>
              )}

              {/* Action Button */}
              <Button
                type="primary"
                block
                size="large"
                style={{
                  marginTop: '16px',
                  height: '48px',
                  fontSize: '15px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  background: '#003a8c',
                  borderColor: '#003a8c',
                }}
              >
                Xuất hóa đơn
              </Button>
            </Card>
          ) : (
            <Card
              style={{
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  Chọn một đơn hàng
                </h3>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  Click vào đơn hàng bên trái để xem chi tiết
                </p>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderHistoryPage;
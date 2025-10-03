import React from 'react';
import { Card, Button, Divider, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Order, OrderItem } from '../../../types/order';

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mock data - sẽ lấy từ API/localStorage dựa trên id
  const order: Order = {
    id: id || '1',
    orderNumber: 'ORD98',
    tableId: 'table-1',
    tableName: 'B1',
    floor: '1',
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Salad Tuna',
          price: 200000,
          category: 'Tất cả',
          image: '',
          description: '',
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: '2',
          name: 'Wagyu Black Paper',
          price: 200000,
          category: 'Tất cả',
          image: '',
          description: '',
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: '3',
          name: 'Salad Egg',
          price: 200000,
          category: 'Tất cả',
          image: '',
          description: '',
        },
        quantity: 1,
      },
    ],
    status: 'completed',
    paymentStatus: 'paid', // 'paid' or 'failed'
    createdAt: new Date('2025-08-19T18:09:22'),
    updatedAt: new Date('2025-08-19T18:09:22'),
    total: 460000,
    discount: 30000,
    discountCode: 'XVYZ6H',
    finalTotal: 430000,
    paymentMethod: 'Tiền mặt',
    staffName: 'Trần Văn B',
    customerName: 'Nguyễn Văn A',
  };

  const isPaid = order.paymentStatus === 'paid';

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Card
        style={{
          marginBottom: '24px',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/order-history')}
              style={{ fontSize: '16px' }}
            />
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#262626' }}>
              Đơn hàng
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginBottom: '4px' }}>
                {order.createdAt.toLocaleDateString('vi-VN')}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#262626' }}>
                {order.createdAt.toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Order Content */}
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
                {order.createdAt.toLocaleDateString('vi-VN')}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#595959' }}>Khách hàng:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                {order.customerName}
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
                {order.staffName}
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
                {order.tableName}
              </span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div style={{ marginBottom: '16px' }}>
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                gap: '12px',
              }}
            >
              {/* Item Image */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#d9d9d9',
                }}
              >
                🍽️
              </div>

              {/* Item Info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                    {item.menuItem.name}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                    -
                  </span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ff8800',
                  }}>
                    {item.menuItem.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                  Số lượng: {item.quantity}
                </div>
              </div>

              {/* Subtotal */}
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0088FF',
                minWidth: '90px',
                textAlign: 'right',
              }}>
                {(item.menuItem.price * item.quantity).toLocaleString('vi-VN')}₫
              </div>
            </div>
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
              {order.total.toLocaleString('vi-VN')}₫
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
                {order.discountCode}
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#FF6F68' }}>
              -{order.discount?.toLocaleString('vi-VN')}₫
            </div>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#262626' }}>Tổng:</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#52c41a' }}>
              {order.finalTotal.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#8c8c8c' }}>
            <span style={{ fontWeight: '600' }}>Phương thức thanh toán:</span> {order.paymentMethod || 'chưa có'}
          </div>
        </div>

        {/* Payment Status */}
        {isPaid ? (
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
    </div>
  );
};

export default OrderDetailPage;

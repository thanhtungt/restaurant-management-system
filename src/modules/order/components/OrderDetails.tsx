import React, { useState } from 'react';
import { Button, List, Space, Modal, Select, Input, Tag } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Table } from '../../../types/table';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const { Option } = Select;

const OrderCard = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
`;

const OrderHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderTitle = styled.h2`
  margin: 0;
`;

const OrderInfo = styled.div`
  margin-bottom: 16px;
`;

const OrderInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const OrderTotal = styled.div`
  font-weight: bold;
  color: #52c41a;
  font-size: 18px;
  text-align: right;
  margin-top: 16px;
`;

const TableInfo = styled.div`
  margin-bottom: 16px;
`;

// Không dùng styled-component cho List vì có vấn đề với generic types

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`;

const ActionButton = styled(Button)`
  flex: 1;
`;

interface OrderDetailsProps {
  table: Table | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ table }) => {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const mockOrderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Salad Tuna',
      price: 200000,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Wagyu Black Paper',
      price: 200000,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Salad Egg',
      price: 200000,
      quantity: 1,
    }
  ];
  
  const totalAmount = mockOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const handlePaymentModalOpen = () => {
    setIsPaymentModalVisible(true);
  };
  
  const handlePaymentModalCancel = () => {
    setIsPaymentModalVisible(false);
  };
  
  const handlePayment = () => {
    // Process payment
    setIsPaymentModalVisible(false);
  };
  
  if (!table) {
    return (
      <OrderCard>
        <p>Vui lòng chọn bàn để xem đơn hàng</p>
      </OrderCard>
    );
  }
  
  return (
    <>
      <OrderCard>
        <OrderHeader>
          <OrderTitle>Đơn hàng</OrderTitle>
          <Button type="link">Đơn hàng trước đó →</Button>
        </OrderHeader>
        
        <TableInfo>
          <OrderInfoItem>
            <span>Ngày tạo đơn:</span>
            <span>19/08/2025</span>
          </OrderInfoItem>
          <OrderInfoItem>
            <span>Thời điểm:</span>
            <span>20:20:45</span>
          </OrderInfoItem>
          <OrderInfoItem>
            <span>Khách hàng:</span>
            <span>Nguyễn Văn A</span>
          </OrderInfoItem>
          <OrderInfoItem>
            <span>Thu ngân:</span>
            <span>Lê Thị C</span>
          </OrderInfoItem>
          <OrderInfoItem>
            <span>Nhân viên:</span>
            <span>Trần Văn B</span>
          </OrderInfoItem>
          <OrderInfoItem>
            <span>Bàn:</span>
            <Tag color="blue">{table.number}</Tag>
          </OrderInfoItem>
        </TableInfo>
        
        <List<OrderItem>
          style={{ marginBottom: '16px' }}
          dataSource={mockOrderItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Space>
                  <Button 
                    icon={<MinusOutlined />} 
                    size="small" 
                  />
                  <span>{item.quantity}</span>
                  <Button 
                    icon={<PlusOutlined />} 
                    size="small"
                  />
                </Space>
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`${item.price.toLocaleString()}đ`}
              />
              <div>{(item.price * item.quantity).toLocaleString()}đ</div>
            </List.Item>
          )}
        />
        
        <OrderInfoItem>
          <span>Tạm tính:</span>
          <span>{totalAmount.toLocaleString()}đ</span>
        </OrderInfoItem>
        <OrderInfoItem>
          <span>Giảm giá:</span>
          <span>0đ</span>
        </OrderInfoItem>
        
        <OrderTotal>
          Tổng: {totalAmount.toLocaleString()}đ
        </OrderTotal>
        
        <ButtonGroup>
          <ActionButton>Lưu</ActionButton>
          <ActionButton type="primary" onClick={handlePaymentModalOpen}>
            Thanh toán
          </ActionButton>
        </ButtonGroup>
      </OrderCard>
      
      <Modal
        title="Thanh toán"
        open={isPaymentModalVisible}
        onCancel={handlePaymentModalCancel}
        footer={[
          <Button key="back" onClick={handlePaymentModalCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handlePayment}>
            Tiếp tục
          </Button>,
        ]}
      >
        <div>
          <p>Vui lòng chọn phương thức thanh toán:</p>
          <Select
            style={{ width: '100%', marginBottom: 16 }}
            value={paymentMethod}
            onChange={value => setPaymentMethod(value)}
          >
            <Option value="cash">Tiền mặt</Option>
            <Option value="transfer">Chuyển khoản</Option>
          </Select>
          
          {paymentMethod === 'transfer' && (
            <div>
              <p>Vui lòng quét mã để thanh toán:</p>
              <div style={{ textAlign: 'center', padding: 16 }}>
                <p>Mã QR ở đây</p>
              </div>
            </div>
          )}
          
          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <span>Tổng: {totalAmount.toLocaleString()}đ</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetails;
import React from 'react';
import { Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { OrderItem } from '../../../types/order';

interface OrderItemComponentProps {
  item: OrderItem;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemove: (menuItemId: string) => void;
}

const OrderItemComponent: React.FC<OrderItemComponentProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.menuItem.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.menuItem.id, item.quantity + 1);
  };

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      onUpdateQuantity(item.menuItem.id, value);
    }
  };

  const subtotal = item.menuItem.price * item.quantity;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Item info */}
      <div style={{ flex: 1, marginRight: '12px' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#262626',
            marginBottom: '4px',
          }}
        >
          {item.menuItem.name}
        </div>
        <div style={{ fontSize: '13px', color: '#8c8c8c' }}>
          {item.menuItem.price.toLocaleString('vi-VN')}₫
        </div>
      </div>

      {/* Quantity controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginRight: '12px',
        }}
      >
        <Button
          type="text"
          size="small"
          icon={<MinusOutlined />}
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
        />
        <InputNumber
          min={1}
          max={99}
          value={item.quantity}
          onChange={handleQuantityChange}
          size="small"
          style={{ width: '50px' }}
          controls={false}
        />
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined />}
          onClick={handleIncrease}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
        />
      </div>

      {/* Subtotal */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1890ff',
          minWidth: '80px',
          textAlign: 'right',
          marginRight: '12px',
        }}
      >
        {subtotal.toLocaleString('vi-VN')}₫
      </div>

      {/* Delete button */}
      <Button
        type="text"
        danger
        size="small"
        icon={<DeleteOutlined />}
        onClick={() => onRemove(item.menuItem.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  );
};

export default OrderItemComponent;

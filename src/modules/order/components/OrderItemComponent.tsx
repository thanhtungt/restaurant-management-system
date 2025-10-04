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
        gap: '12px',
      }}
    >
      {/* Item Image */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '20px',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#f0f0f0',
        }}
      >
        {item.menuItem.image ? (
          <img
            src={item.menuItem.image}
            alt={item.menuItem.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#d9d9d9',
            }}
          >
            🍽️
          </div>
        )}
      </div>

      {/* Item info and Quantity controls */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '8px',
          }}
        >
          <span style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2A3256',
          }}>
            {item.menuItem.name}
          </span>
          <span style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2A3256',
          }}>
            -
          </span>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: '500',
            color: '#FF8D28',
          }}>
            {item.menuItem.price.toLocaleString('vi-VN')}₫
          </span>
        </div>
        
        {/* Quantity controls under item name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Button
            type="primary"
            size="small"
            icon={<MinusOutlined style={{ fontSize: '8px' }} />}
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              padding: 0,
              background: '#0D62CA',
              borderColor: '#1A72DD',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: '#000000',
              minWidth: '20px',
              textAlign: 'center',
            }}
          >
            {item.quantity}
          </span>
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined style={{ fontSize: '8px'}} />}
            onClick={handleIncrease}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              padding: 0,
              background: '#1A72DD',
              borderColor: '#1A72DD',
            }}
          />
        </div>
      </div>

      {/* Subtotal */}
      <div
        style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#0088FF',
          minWidth: '90px',
          textAlign: 'right',
        }}
      >
        {subtotal.toLocaleString('vi-VN')}₫
      </div>
    </div>
  );
};

export default OrderItemComponent;

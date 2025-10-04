import React from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MenuItem } from '../../../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAddItem?: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddItem }) => {
  const handleAddClick = () => {
    if (onAddItem) {
      onAddItem(item);
    }
  };

  return (
    <Card
      hoverable
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '160px',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #f0f0f0',
      }}
      bodyStyle={{
        padding: '12px',
      }}
      cover={
        <div
          style={{
            width: '100%',
            height: '120px',
            overflow: 'hidden',
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px 16px 0 0',
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #bfbfbf; font-size: 40px;">
                      🍽️
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div
              style={{
                fontSize: '40px',
                color: '#bfbfbf',
              }}
            >
              🍽️
            </div>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4
          style={{
            margin: '0',
            fontSize: '14px',
            fontWeight: '600',
            color: '#262626',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </h4>

        <p
          style={{
            margin: '2px 0',
            fontSize: '11px',
            color: '#8c8c8c',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minHeight: '16px',
          }}
        >
          {item.description || '\u00A0'}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#1A72DD',
            }}
          >
            {item.price.toLocaleString('vi-VN')} VND
          </span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
            size="small"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0D62CA',
              borderColor: '#1A72DD',
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;

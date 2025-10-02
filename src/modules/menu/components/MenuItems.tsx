import React from 'react';
import { Spin, Empty, Alert } from 'antd';
import { MenuItem } from '../../../types/menu';
import MenuItemCard from './MenuItemCard';
import './MenuItems.css';

interface MenuItemsProps {
  items: MenuItem[];
  onAddItem?: (item: MenuItem) => void;
  loading?: boolean;
  error?: string | null;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  items,
  onAddItem,
  loading = false,
  error = null,
}) => {
  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin size="large" tip="Đang tải danh sách món ăn..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        message="Lỗi"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <Empty
        description="Không tìm thấy món ăn"
        style={{ padding: '40px 0' }}
      />
    );
  }

  // Render menu items in horizontal scroll
  return (
    <div className="menu-items-scroll">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAddItem={onAddItem} />
      ))}
    </div>
  );
};

export default MenuItems;
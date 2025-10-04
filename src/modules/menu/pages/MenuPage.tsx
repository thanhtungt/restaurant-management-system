import React from 'react';
import { Card, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MenuItems from '../components/MenuItems';
import MenuCategoryFilter from '../components/MenuCategoryFilter';
import useMenu from '../hooks/useMenu';

const MenuPage: React.FC = () => {
  const {
    menuItems,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    error,
    handleCategoryChange,
    handleSearch,
  } = useMenu();

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 80px)' }}>
      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: '600' }}>
            Danh mục các món
          </span>
        }
        extra={
          <Input
            placeholder="Nhập tên món ăn..."
            prefix={<SearchOutlined style={{ color: '#000000' }} />}
            style={{ width: 300, borderRadius: '8px' }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
        }
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <MenuCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          loading={loading}
        />

        <MenuItems
          items={menuItems}
          loading={loading}
          error={error}
          onAddItem={(item) => {
            console.log('Added item:', item);
            // This will be handled by parent component in integration phase
          }}
        />
      </Card>
    </div>
  );
};

export default MenuPage;

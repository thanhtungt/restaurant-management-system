import React from 'react';
import { Space, Button } from 'antd';
import { MenuCategory } from '../../../types/menu';

interface MenuCategoryFilterProps {
  categories: MenuCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

const MenuCategoryFilter: React.FC<MenuCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  loading = false,
}) => {
  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <Button
        type={selectedCategory === 'all' ? 'primary' : 'default'}
        onClick={() => onCategoryChange('all')}
        style={{ 
          borderRadius: '20px',
          border: selectedCategory === 'all' ? 'none' : '2px solid #5296E5',
          color: selectedCategory === 'all' ? '#fff' : '#5296E5',
          fontWeight: '500',
          height: '36px',
          padding: '0 20px',
        }}
        disabled={loading}
      >
        Tất cả
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          type={selectedCategory === category.id ? 'primary' : 'default'}
          onClick={() => onCategoryChange(category.id)}
          style={{ 
            borderRadius: '20px',
            border: selectedCategory === category.id ? 'none' : '2px solid #5296E5',
            color: selectedCategory === category.id ? '#fff' : '#5296E5',
            fontWeight: '500',
            height: '36px',
            padding: '0 20px',
          }}
          disabled={loading}
        >
          {category.name}
        </Button>
      ))}
    </Space>
  );
};

export default MenuCategoryFilter;

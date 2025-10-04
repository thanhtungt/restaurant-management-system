import React, { useRef } from 'react';
import { Spin, Empty, Alert, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      isDraggingRef.current = true;
      startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.style.cursor = 'grabbing';
      scrollContainerRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

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
    <div style={{ position: 'relative' }}>
      {/* Navigation Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        gap: '8px', 
        marginBottom: '12px' 
      }}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => scroll('left')}
          style={{
            backgroundColor: '#0088FF',
            borderColor: '#0088FF',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowRightOutlined />}
          onClick={() => scroll('right')}
          style={{
            backgroundColor: '#0088FF',
            borderColor: '#0088FF',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>

      {/* Menu Items Scroll Container */}
      <div 
        className="menu-items-scroll" 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onAddItem={onAddItem} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
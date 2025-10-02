import React, { useState } from 'react';
import { Card, Row, Col, Button, Space, Badge, Select, Input } from 'antd';
import { SearchOutlined, LeftOutlined } from '@ant-design/icons';
import { Table } from '../../../types/table';
import MenuItems from '../../menu/components/MenuItems';
import MenuCategoryFilter from '../../menu/components/MenuCategoryFilter';
import OrderDetails from '../../order/components/OrderDetails';
import PaymentModal from '../../payment/components/PaymentModal';
import useMenu from '../../menu/hooks/useMenu';
import useOrder from '../../order/hooks/useOrder';
import { useTables } from '../../../hooks/useTables';

const { Option } = Select;

const TableManagementPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  
  // Use custom hooks
  const menuState = useMenu();
  const orderState = useOrder(selectedTable?.id);
  const { tables, loading: tablesLoading } = useTables();

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    // Payment will be handled by PaymentModal
    setPaymentModalVisible(false);
    orderState.clearOrder();
  };

  const getTableStyle = (table: Table) => {
    const isSelected = selectedTable?.id === table.id;
    const baseStyle = {
      width: '100%',
      height: '80px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s',
    };

    if (isSelected) {
      return { 
        ...baseStyle, 
        background: '#1890ff', 
        color: '#fff', 
        border: '3px dashed #0050b3',
        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.4)',
      };
    }

    switch (table.status) {
      case 'empty':
        return { 
          ...baseStyle, 
          background: '#0088FF', 
          color: '#fff',
          border: 'none',
        };
      case 'inUse':
        return { 
          ...baseStyle, 
          background: '#C4C4C4', 
          color: '#fff', 
          border: 'none',
        };
      case 'reserved':
        return { 
          ...baseStyle, 
          background: '#FF5F57', 
          color: '#fff', 
          border: 'none',
        };
      default:
        return baseStyle;
    }
  };

  // Count tables by status
  const getTableCounts = () => {
    const counts = {
      empty: tables.filter(t => t.status === 'empty').length,
      inUse: tables.filter(t => t.status === 'inUse').length,
      reserved: tables.filter(t => t.status === 'reserved').length,
      selected: selectedTable ? 1 : 0,
    };
    return counts;
  };

  const tableCounts = getTableCounts();

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 80px)' }}>
      {/* Back button */}
      <Button 
        type="text" 
        icon={<LeftOutlined />}
        style={{ marginBottom: '16px', color: '#1890ff', fontSize: '14px' }}
      >
        Quay lại
      </Button>

      <Row gutter={16}>
        {/* Left Column - Menu & Tables */}
        <Col span={16}>
          {/* Menu Section */}
          <Card 
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              marginBottom: '16px',
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: 0 }}
          >
            {/* Blue Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #5B9FED 0%, #4A8FDD 100%)',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#fff',
                }}
              >
                Danh mục các món
              </h2>
              <Input
                placeholder="Nhập tên món ăn..."
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                style={{
                  width: 300,
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                value={menuState.searchQuery}
                onChange={(e) => menuState.handleSearch(e.target.value)}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px' }}>
              <MenuCategoryFilter 
                categories={menuState.categories}
                selectedCategory={menuState.selectedCategory}
                onCategoryChange={menuState.handleCategoryChange}
                loading={menuState.loading}
              />
              
              <MenuItems 
                items={menuState.menuItems}
                loading={menuState.loading}
                error={menuState.error}
                onAddItem={orderState.addItem}
              />
            </div>
          </Card>
          
          {/* Tables Section */}
          <Card 
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            {/* Header with Ca badge and Floor selector */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: '#262626',
                }}>
                  Chọn bàn
                </h2>
                <span style={{
                  background: '#faad14',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}>
                  Ca: Tối
                </span>
              </div>
              
              <Select 
                value={selectedFloor}
                onChange={setSelectedFloor}
                style={{ width: 140 }}
                size="large"
              >
                <Option value="1">Tầng 1</Option>
               
              </Select>
            </div>

            {/* Status legend with counts */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '12px 16px',
              background: '#fafafa',
              borderRadius: '8px',
            }}>
              <Space size={24}>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                    Đang trống:
                  </span>
                  <Badge 
                    count={tableCounts.empty} 
                    style={{ 
                      backgroundColor: '#0088FF',
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  />
                </Space>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                    Đang dùng:
                  </span>
                  <Badge 
                    count={tableCounts.inUse} 
                    style={{ 
                      backgroundColor: '#C4C4C4',
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  />
                </Space>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                    Đặt trước:
                  </span>
                  <Badge 
                    count={tableCounts.reserved} 
                    style={{ 
                      backgroundColor: '#FF5F57',
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  />
                </Space>
              </Space>
              
              <Space size={8}>
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600',
                  color: '#1890ff',
                }}>
                  Đang chọn:
                </span>
                {selectedTable && (
                  <Badge 
                    count={`${selectedTable.number}`}
                    style={{ 
                      backgroundColor: '#1890ff',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '13px',
                    }}
                  />
                )}
              </Space>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '8px'
            }}>
              {tables.map(table => (
                <Button
                  key={table.id}
                  onClick={() => handleTableClick(table)}
                  style={getTableStyle(table)}
                >
                  {table.number}
                </Button>
              ))}
            </div>
          </Card>
        </Col>
        
        {/* Right Column - Order Details */}
        <Col span={8}>
          <Card 
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              minHeight: '600px'
            }}
          >
            <OrderDetails 
              table={selectedTable}
              items={orderState.orderItems}
              total={orderState.calculateTotal()}
              itemsCount={orderState.getTotalItemsCount()}
              selectedFloor={selectedFloor}
              onUpdateQuantity={orderState.updateQuantity}
              onRemoveItem={orderState.removeItem}
              onClearOrder={orderState.clearOrder}
              onPayment={() => setPaymentModalVisible(true)}
            />
          </Card>
        </Col>
      </Row>

      {/* Payment Modal */}
      <PaymentModal
        visible={paymentModalVisible}
        order={orderState.orderItems}
        table={selectedTable}
        total={orderState.calculateTotal()}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handlePaymentSuccess}
      />
    </div>
  );
};

export default TableManagementPage;
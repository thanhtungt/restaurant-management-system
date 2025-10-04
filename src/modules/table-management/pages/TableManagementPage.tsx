import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Space, Badge, Select, Input } from 'antd';
import { SearchOutlined, LeftOutlined, CalendarOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table } from '../../../types/table';
import { Order } from '../../../types/order';
import tableStorageService from '../../../services/tableService';
import { orderService } from '../../../services/orderService';
import MenuItems from '../../menu/components/MenuItems';
import MenuCategoryFilter from '../../menu/components/MenuCategoryFilter';
import OrderDetails from '../../order/components/OrderDetails';
import OrderHistorySidebar from '../../order/components/OrderHistorySidebar';
import PaymentModal from '../../payment/components/PaymentModal';
import useMenu from '../../menu/hooks/useMenu';
import useOrder from '../../order/hooks/useOrder';
import { useTables } from '../../../hooks/useTables';

const { Option } = Select;

const TableManagementPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [orderHistorySidebarVisible, setOrderHistorySidebarVisible] = useState(false);
  const [selectedHistoryOrder, setSelectedHistoryOrder] = useState<Order | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Use custom hooks
  const menuState = useMenu();
  const orderState = useOrder(selectedTable?.id);
  const { tables, loading: tablesLoading, refreshTables } = useTables();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-select bàn B1 (bàn đầu tiên ở tầng 1) khi page load
  useEffect(() => {
    if (tables.length > 0 && !selectedTable && !selectedHistoryOrder && selectedFloor === '1') {
      // Tìm bàn B1 ở tầng 1
      const firstTable = tables.find(t => t.floor === 1 && t.number === 'B1');
      if (firstTable) {
        setSelectedTable(firstTable);
      }
    }
  }, [tables, selectedTable, selectedHistoryOrder, selectedFloor]);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    
    // Nếu bàn đang dùng, load đơn hàng hiện tại của bàn đó
    if (table.status === 'inUse') {
      
      // Tìm đơn hàng gần nhất của bàn này từ localStorage
      const allOrders = orderService.getAllOrders();
      const tableOrders = allOrders.filter(order => order.tableId === table.id);
      
      // Lấy đơn hàng gần nhất (chưa thanh toán)
      const currentOrder = tableOrders
        .filter(order => order.paymentStatus === 'unpaid')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      
      if (currentOrder) {
        // Load order KHÔNG hiển thị banner (fromSidebar = false)
        orderState.loadOrderFromHistory(currentOrder, false);
      } else {
        // Clear order nếu không tìm thấy (không hiển thị message)
        orderState.clearOrder(false);
      }
    } else {
      // Bàn trống hoặc đã đặt - clear order (không hiển thị message)
      orderState.clearOrder(false);
    }
  };

  const handleOpenPaymentModal = () => {
    // Kiểm tra xem có đơn hàng không
    if (!selectedTable || orderState.orderItems.length === 0) {
      return;
    }
    
    // Tự động lưu/update đơn hàng trước khi thanh toán
    const discountAmount = 30000;
    const total = orderState.calculateTotal();
    
    if (orderState.currentOrder && orderState.currentOrder.id) {
      // Cập nhật đơn hàng hiện tại
      orderService.updateOrder(orderState.currentOrder.id, {
        items: orderState.orderItems,
        total: total,
        discount: discountAmount,
        finalTotal: total - discountAmount,
      });
    } else {
      // Tạo đơn hàng mới
      const newOrder = orderService.saveOrder({
        tableId: selectedTable.id,
        tableName: selectedTable.number,
        floor: selectedFloor,
        items: orderState.orderItems,
        status: 'pending',
        paymentStatus: 'unpaid',
        total: total,
        discount: discountAmount,
        discountCode: 'XVYZ6H',
        finalTotal: total - discountAmount,
        staffName: 'Trần Văn B',
        customerName: 'Lê Thị C',
      });
      
      // Cập nhật currentOrder trong state
      // Note: Cần reload order để có ID
      const allOrders = orderService.getAllOrders();
      const savedOrder = allOrders.find(o => o.orderNumber === newOrder.orderNumber);
      if (savedOrder) {
        orderState.loadOrderFromHistory(savedOrder, false);
      }
      
      // Cập nhật trạng thái bàn
      tableStorageService.updateTableStatus(selectedTable.id, 'inUse');
      refreshTables();
    }
    
    // Mở payment modal
    setPaymentModalVisible(true);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    
    // Cập nhật trạng thái thanh toán của đơn hàng
    if (orderState.currentOrder && orderState.currentOrder.id) {
      const updatedOrder = orderService.updatePaymentStatus(
        orderState.currentOrder.id, 
        'paid',
        paymentData.method
      );
    }
    
    // Đóng modal
    setPaymentModalVisible(false);
    
    // Reset table status to empty after payment
    if (selectedTable) {
      tableStorageService.updateTableStatus(selectedTable.id, 'empty');
      refreshTables();
    }
    
    // Clear order và deselect table
    orderState.clearOrder();
    setSelectedTable(null);
  };

  const handleSelectHistoryOrder = (order: Order) => {
    
    // Find and select the table from the order
    const orderTable = tables.find(t => t.id === order.tableId);
    
    if (orderTable) {
      setSelectedTable(orderTable);
      setSelectedHistoryOrder(order);
      
      // Load order items với banner trạng thái (fromSidebar = true)
      orderState.loadOrderFromHistory(order, true);
      setOrderHistorySidebarVisible(false);
    } else {
      console.warn('Table not found for order:', order.tableId);
      // Vẫn load order nhưng không có bàn
      setSelectedHistoryOrder(order);
      orderState.loadOrderFromHistory(order, true);
      setOrderHistorySidebarVisible(false);
    }
  };

  const getTableStyle = (table: Table): React.CSSProperties => {
    const isSelected = selectedTable?.id === table.id;
    const baseStyle: React.CSSProperties = {
      width: '100%',
      height: '80px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '0',
      transition: 'all 0.3s',
    };

    let style: React.CSSProperties = { ...baseStyle };

    switch (table.status) {
      case 'empty':
        style = { 
          ...style, 
          background: '#5296E5', 
          color: '#fff',
          border: 'none',
        };
        break;
      case 'inUse':
        style = { 
          ...style, 
          background: '#C4C4C4', 
          color: '#fff', 
          border: 'none',
        };
        break;
      case 'reserved':
        style = { 
          ...style, 
          background: '#FF5F57', 
          color: '#fff', 
          border: 'none',
        };
        break;
      default:
        break;
    }

    if (isSelected) {
      style = {
        ...style,
        border: '3px dashed #0050b3',
      };
    }

    return style;
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Button 
          type="primary"
          icon={<ArrowLeftOutlined />}
          shape="circle"
          style={{ 
            backgroundColor: '#0088FF',
            borderColor: '#0088FF',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        />
        <span style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#0088FF',
          cursor: 'pointer'
        }}>
          Quay lại
        </span>
      </div>

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
            styles={{ body: { padding: 0 } }}
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
                prefix={<SearchOutlined style={{ color: '#000000' }} />}
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
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            styles={{ body: { padding: '24px' } }}
          >
            {/* Header with Ca badge and Floor selector */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: '#000000',
                }}>
                  Chọn bàn
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000000',
                  }}>
                    Ca:
                  </span>
                  <span style={{
                    background: '#FF9D00',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Tối
                  </span>
                </div>
              </div>
              
              <Select 
                value={selectedFloor}
                onChange={setSelectedFloor}
                style={{ width: 140, fontWeight: '700' }}
                size="large"
              >
                <Option value="1">Tầng 1</Option>
               
              </Select>
            </div>

            {/* Divider Line */}
            <div style={{ 
              width: '100%', 
              height: '1px', 
              background: '#d9d9d9',
              marginBottom: '20px',
            }} />

            {/* Status legend with counts */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '12px 16px',
            }}>
              <Space size={24}>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                    Đang trống:
                  </span>
                  <Badge 
                    count={tableCounts.empty} 
                    style={{ 
                      backgroundColor: '#0088FF',
                      color: '#FFFFFF',
                      fontWeight: '700',
                    }}
                  />
                </Space>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                    Đang dùng:
                  </span>
                  <Badge 
                    count={tableCounts.inUse} 
                    style={{ 
                      backgroundColor: '#C3C3C3',
                      color: '#FFFFFF',
                      fontWeight: '700',
                    }}
                  />
                </Space>
                <Space size={8}>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                    Đặt trước:
                  </span>
                  <Badge 
                    count={tableCounts.reserved} 
                    style={{ 
                      backgroundColor: '#F90000',
                      color: '#FFFFFF',
                      fontWeight: '700',
                    }}
                  />
                </Space>
              </Space>
              
              <Space size={8}>
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '700',
                  color: '#5296E5',
                }}>
                  Đang chọn:
                </span>
                {selectedTable && (
                  <Badge 
                    count={`${selectedTable.number}`}
                    style={{ 
                      backgroundColor: '#5296E5',
                      color: '#FFFFFF',
                      fontWeight: '700',
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
          {/* Date/Time and Previous Orders Section */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
            {/* Date & Time Box */}
            <Card style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }} styles={{ body: { padding: '12px 16px' } }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CalendarOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  {currentTime.toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClockCircleOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  {currentTime.toLocaleTimeString('vi-VN')}
                </span>
              </div>
            </Card>

            {/* Previous Orders Button */}
            <Card style={{
              flex: 1,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
            }}
            onClick={() => setOrderHistorySidebarVisible(true)}
            styles={{ 
              body: {
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '100%',
              }
            }}>
              <ArrowLeftOutlined style={{ fontSize: '14px' }} />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>
                Đơn hàng trước đó
              </span>
            </Card>
          </div>

          {/* Order Details Card */}
          <Card 
            style={{ 
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              ...(orderState.orderItems.length > 0 && { height: '800px' })
            }}
            styles={{ 
              body: {
                ...(orderState.orderItems.length > 0 && { height: '100%' }), 
                padding: 0 
              }
            }}
          >
            <OrderDetails 
              table={selectedTable}
              items={orderState.orderItems}
              total={orderState.calculateTotal()}
              itemsCount={orderState.getTotalItemsCount()}
              selectedFloor={selectedFloor}
              currentOrder={orderState.currentOrder}
              showPaymentStatus={orderState.showPaymentStatus}
              onUpdateQuantity={orderState.updateQuantity}
              onRemoveItem={orderState.removeItem}
              onClearOrder={orderState.clearOrder}
              onPayment={handleOpenPaymentModal}
              onTableStatusChange={refreshTables}
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

      {/* Order History Sidebar */}
      <OrderHistorySidebar
        visible={orderHistorySidebarVisible}
        onClose={() => setOrderHistorySidebarVisible(false)}
        onSelectOrder={handleSelectHistoryOrder}
      />
    </div>
  );
};

export default TableManagementPage;
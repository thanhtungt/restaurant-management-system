import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Select, Button } from 'antd';
import { 
  CalendarOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  RevenueIcon,
  MenuIcon,
  InfrastructureIcon,
  SalaryIcon,
  WarehouseIcon,
  SettingsIcon,
  StaffIcon,
  InvoiceIcon,
  FeedbackIcon,
  ShiftIcon,
} from '../../../components/icons/DashboardIcons';

const DashboardPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('warehouse');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data for warehouse management
  const warehouseData = {
    date: '19/08/2025',
    import: 1090000,
    export: 520000,
    chartData: [
      { date: '19/7/2025', import: 800000, export: 400000 },
      { date: '20/7/2025', import: 900000, export: 450000 },
      { date: '21/7/2025', import: 750000, export: 380000 },
      { date: '22/7/2025', import: 1100000, export: 500000 },
      { date: '19/8/2025', import: 1090000, export: 520000 }
    ]
  };

  // Mock data for revenue
  const revenueData = {
    totalExpense: 1090000,
    totalRevenue: 520000,
    pieData: [
      { name: 'Chi Tiêu', value: 1090000, color: '#ff4d4f' },
      { name: 'Thu Nhập', value: 520000, color: '#52c41a' }
    ]
  };

  // Get date range from chart data
  const getDateRange = (chartData: any[]) => {
    if (chartData.length === 0) return { startDate: '', endDate: '' };
    const dates = chartData.map(item => item.date);
    return {
      startDate: dates[0],
      endDate: dates[dates.length - 1]
    };
  };

  const warehouseDateRange = getDateRange(warehouseData.chartData);
  const revenueDateRange = getDateRange(warehouseData.chartData);

  // Mock data for applications
  const applications = [
    { name: 'Doanh thu', icon: <RevenueIcon width={46} height={46} />, color: '#1890ff' },
    { name: 'Thực đơn', icon: <MenuIcon width={46} height={46} />, color: '#52c41a' },
    { name: 'Hạ tầng', icon: <InfrastructureIcon width={46} height={46} />, color: '#722ed1' },
    { name: 'Lương', icon: <SalaryIcon width={46} height={46} />, color: '#fa8c16' },
    { name: 'Kho', icon: <WarehouseIcon width={46} height={46} />, color: '#f5222d' },
    { name: 'Cài đặt', icon: <SettingsIcon width={46} height={46} />, color: '#13c2c2' },
    { name: 'Nhân sự', icon: <StaffIcon width={46} height={46} />, color: '#eb2f96' },
    { name: 'Hóa đơn', icon: <InvoiceIcon width={46} height={46} />, color: '#faad14' },
    { name: 'Phản hồi', icon: <FeedbackIcon width={46} height={46} />, color: '#a0d911' },
    { name: 'Ca làm', icon: <ShiftIcon width={46} height={46} />, color: '#2f54eb' }
  ];

  return (
    <div style={{ 
      padding: '24px', 
      background: '#fff', 
      minHeight: 'calc(100vh - 80px)',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out'
    }}>
      {/* Main Title */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '20px 0',
        width: '821px',
        height: '44px',
        margin: '0 auto 40px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out 0.2s'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          color: '#1890ff',
          margin: 0,
          display: 'inline'
        }}>
          ShineWay
        </h1>
        <span style={{ 
          fontSize: '32px', 
          fontWeight: '500',
          color: '#333',
          marginLeft: '12px'
        }}>
          - Hệ thống hỗ trợ vận hành nhà hàng
        </span>
      </div>

      {/* Main Dashboard Container */}
      <div style={{
        background: '#5296E5',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 8px 32px rgba(82, 150, 229, 0.2)',
        width: '1286px',
        height: '580px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: 'all 0.8s ease-out 0.4s'
      }}>
        <Row gutter={[32, 32]} style={{ width: '100%', margin: 0, alignItems: 'stretch' }}>
          {/* Left Column - Warehouse Management */}
          <Col xs={24} lg={7} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header with Dropdown and Date Filter */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px',
              gap: '12px'
            }}>
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                style={{ 
                  width: '290px',
                  fontWeight: 'bold',
                  height: '40px'
                }}
                options={[
                  { value: 'warehouse', label: 'Xuất / Nhập kho' },
                  { value: 'revenue', label: 'Tổng doanh thu' }
                ]}
              />
              <div style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                width: '40px',
                height: '40px'
              }}>
                <CalendarOutlined style={{ color: '#666' }} />
              </div>
            </div>
            
            {/* Info Card */}
            <Card style={{
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: 'none',
              flex: 1,
              width: '100%'
            }}>
              {selectedOption === 'warehouse' ? (
                <>
                  <div style={{ marginBottom: '16px' }}>
                     <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Ngày:</span>{' '}
                      <span style={{ color: '#1890ff' }}>
                        {warehouseDateRange.startDate} - {warehouseDateRange.endDate}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Nhập kho:</span>{' '}
                      <span style={{ color: '#52c41a' }}>
                        {warehouseData.import.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Xuất kho:</span>{' '}
                      <span style={{ color: '#ff4d4f' }}>
                        {warehouseData.export.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                   
                  </div>

                  {/* Line Chart */}
                  <div style={{ height: '160px', marginBottom: '16px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={warehouseData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          stroke="#666"
                        />
                        <YAxis hide />
                        <Tooltip 
                          formatter={(value: any) => [`${value.toLocaleString('vi-VN')}₫`, '']}
                          labelStyle={{ color: '#333' }}
                        />
                        <RechartsLine 
                          type="monotone" 
                          dataKey="import" 
                          stroke="#52c41a" 
                          strokeWidth={3}
                          dot={{ fill: '#52c41a', strokeWidth: 2, r: 4 }}
                        />
                        <RechartsLine 
                          type="monotone" 
                          dataKey="export" 
                          stroke="#ff4d4f" 
                          strokeWidth={3}
                          dot={{ fill: '#ff4d4f', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Ngày:</span>{' '}
                      <span style={{ color: '#1890ff' }}>
                        {revenueDateRange.startDate} - {revenueDateRange.endDate}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Tổng Chi:</span>{' '}
                      <span style={{ color: '#ff4d4f' }}>
                        {revenueData.totalExpense.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#000' }}>Tổng thu:</span>{' '}
                      <span style={{ color: '#52c41a' }}>
                        {revenueData.totalRevenue.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  
                  </div>
                  
                  {/* Legend for Pie Chart */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '20px', 
                    marginBottom: '12px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#ff4d4f',
                        borderRadius: '2px'
                      }} />
                      <span style={{ fontSize: '12px', color: '#333' }}>Chi Tiêu</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#52c41a',
                        borderRadius: '2px'
                      }} />
                      <span style={{ fontSize: '12px', color: '#333' }}>Thu Nhập</span>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div style={{ height: '160px', marginBottom: '16px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueData.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {revenueData.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value.toLocaleString('vi-VN')}₫`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
              
              <div style={{ textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  
                  style={{
                    borderRadius: '8px',
                    background: '#5296E5',
                    border: 'none',
                    fontWeight: '500'
                  }}
                >
                  Chi tiết
                  <DoubleRightOutlined />
                </Button>
              </div>
            </Card>
          </Col>

          {/* Divider Line */}
          <Col xs={0} lg={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
            <div style={{
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              minHeight: '480px'
            }} />
          </Col>

          {/* Right Column - All Applications */}
          <Col xs={24} lg={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ 
              color: '#fff', 
              fontSize: '24px', 
              fontWeight: '600',
              marginBottom: '32px'
            }}>
              Tất cả ứng dụng
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(2, auto)',
              gap: '16px 20px',
              height: '100%',
              alignItems: 'start'
            }}>
              {applications.map((app, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
                    transition: `all 0.5s ease-out ${0.6 + (index * 0.1)}s, transform 0.2s ease`
                  }}
                  onMouseEnter={(e) => {
                    const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                    if (iconBox) {
                      iconBox.style.transform = 'translateY(-4px) scale(1.05)';
                      iconBox.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                    if (iconBox) {
                      iconBox.style.transform = 'translateY(0) scale(1)';
                      iconBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {/* Icon với nền màu riêng */}
                  <div 
                    className="icon-box"
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '96px',
                      height: '96px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      color: app.color,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {app.icon}
                    </div>
                  </div>
                  
                  {/* Text bên dưới */}
                  <div style={{
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: '500',
                    lineHeight: '1.2',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {app.name}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TableOutlined, 
  ShopOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  ReconciliationOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

const Logo = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
`;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const { authState } = useAuth();
  const { user } = authState;

  // Define menu items based on user role
  const getMenuItems = () => {
    // Common menu items for all users
    const commonItems = [
      {
        key: 'tables',
        icon: <TableOutlined />,
        label: <Link to="/tables">Quản lý Bàn</Link>,
      },
      {
        key: 'orders/history',
        icon: <FileTextOutlined />,
        label: <Link to="/orders/history">Lịch sử Đơn hàng</Link>,
      },
    ];
    
    // Admin only menu items
    const adminItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">Dashboard</Link>,
      },
      {
        key: 'menu',
        icon: <ShopOutlined />,
        label: <Link to="/menu">Quản lý Thực đơn</Link>,
      },
      {
        key: 'revenue',
        icon: <BarChartOutlined />,
        label: <Link to="/revenue">Doanh thu</Link>,
      },
      {
        key: 'inventory',
        icon: <ReconciliationOutlined />,
        label: <Link to="/inventory">Kho hàng</Link>,
      },
      {
        key: 'staff',
        icon: <TeamOutlined />,
        label: <Link to="/staff">Nhân sự</Link>,
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: <Link to="/settings">Cài đặt</Link>,
      },
    ];

    // Return appropriate menu items based on role
    return user?.role === 'admin' ? [...adminItems, ...commonItems] : commonItems;
  };

  return (
    <StyledSider trigger={null} collapsible collapsed={collapsed} theme="dark" width={240}>
      <Logo>{collapsed ? 'SW' : 'ShineWay'}</Logo>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
        items={getMenuItems()}
      />
    </StyledSider>
  );
};

export default Sidebar;
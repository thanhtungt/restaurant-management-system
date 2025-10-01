import React from 'react';
import { Layout, Button, Avatar, Space, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  margin-right: auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const RoleBadge = styled.span<{ role: string }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: ${props => props.role === 'admin' ? '#faad14' : '#52c41a'};
  color: white;
`;

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { authState, logout } = useAuth();
  const { user } = authState;

  if (!user) {
    return null;
  }

  const userMenu = (
    <Menu
      items={[
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Đăng xuất',
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <StyledHeader>
      {onToggleSidebar && (
        <Button
          type="text"
          icon={<MenuUnfoldOutlined />}
          onClick={onToggleSidebar}
          style={{ marginRight: 16 }}
        />
      )}
      <Logo>ShineWay</Logo>
      
      <Dropdown overlay={userMenu} placement="bottomRight">
        <UserInfo>
          <Avatar 
            icon={<UserOutlined />}
            src={user.avatar}
          />
          <div>
            <UserName>{user.name}</UserName>
            <div>
              <RoleBadge role={user.role}>
                {user.role === 'admin' ? 'Admin' : 'Bồi bàn'}
              </RoleBadge>
            </div>
          </div>
        </UserInfo>
      </Dropdown>
    </StyledHeader>
  );
};

export default AppHeader;
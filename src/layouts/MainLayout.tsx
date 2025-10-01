import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const { Header, Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

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

const StyledContent = styled(Content)`
  margin: 24px;
  background: #fff;
  padding: 24px;
  min-height: 280px;
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
`;

const MainLayout: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>ShineWay</Logo>
        <UserInfo>
          <span>Nguyễn Văn A</span>
        </UserInfo>
      </StyledHeader>
      <StyledLayout>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledLayout>
    </StyledLayout>
  );
};

export default MainLayout;
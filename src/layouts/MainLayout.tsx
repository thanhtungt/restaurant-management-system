import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f7faff;
`;

const StyledContent = styled(Content)`
  padding: 0;
  min-height: calc(100vh - 80px);
`;

const MainLayout: React.FC = () => {
  return (
    <StyledLayout>
      <AppHeader />
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
};

export default MainLayout;
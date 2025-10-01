import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: transparent;
`;

const MainLayout: React.FC = () => {
  return (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
};

export default MainLayout;
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 16px;
`;

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard - ShineWay</h1>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard>
            <Statistic 
              title="Doanh thu" 
              value={1090000} 
              precision={0} 
              suffix="đ" 
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic 
              title="Lượng" 
              value={15} 
              precision={0} 
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic 
              title="Nhập kho" 
              value={1090000} 
              precision={0} 
              suffix="đ" 
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic 
              title="Xuất kho" 
              value={520000} 
              precision={0} 
              suffix="đ" 
            />
          </StyledCard>
        </Col>
      </Row>
      
      <h2>Tất cả ứng dụng</h2>
      <Row gutter={16}>
        <Col span={4}>
          <StyledCard title="Doanh thu" hoverable>
            Thống kê doanh thu
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Thực đơn" hoverable>
            Quản lý thực đơn
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Hạ tầng" hoverable>
            Quản lý hạ tầng
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Lượng" hoverable>
            Theo dõi lượng
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Kho" hoverable>
            Quản lý kho
          </StyledCard>
        </Col>
      </Row>
      
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={4}>
          <StyledCard title="Cài đặt" hoverable>
            Cài đặt hệ thống
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Nhân sự" hoverable>
            Quản lý nhân sự
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Hóa đơn" hoverable>
            Quản lý hóa đơn
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Phản hồi" hoverable>
            Quản lý phản hồi
          </StyledCard>
        </Col>
        <Col span={4}>
          <StyledCard title="Ca làm" hoverable>
            Quản lý ca làm
          </StyledCard>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
import React from 'react';
import { Card, Row, Col, Typography, Input, Select, Button, DatePicker, Avatar, Statistic } from 'antd';
import { 
  BarChartOutlined, 
  ShopOutlined, 
  TeamOutlined,
  DatabaseOutlined,
  SettingOutlined,
  FileTextOutlined,
  UserOutlined,
  SwapOutlined,
  SearchOutlined,
  BellOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';

const { Title } = Typography;
const { Search } = Input;

const DashboardContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #fff;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
`;

const UserRole = styled.div`
  background-color: #faad14;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  text-align: center;
`;

const PageTitle = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const MainContent = styled.div`
  padding: 0 24px 24px;
`;

const ContentBackground = styled.div`
  background-color: #4096ff;
  border-radius: 12px;
  padding: 24px;
  color: white;
`;

const StatsCard = styled(Card)`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const AppGrid = styled.div`
  margin-top: 24px;
`;

const AppCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const AppIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 24px;
  margin-bottom: 8px;
`;

const AppLabel = styled.div`
  font-weight: 500;
  color: white;
  margin-top: 8px;
`;

const StatsContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <DashboardContainer>
      <HeaderContainer>
        <Logo>ShineWay</Logo>
        <Search 
          placeholder="Tìm kiếm..." 
          style={{ width: 300, margin: '0 auto' }} 
          prefix={<SearchOutlined />} 
        />
        <HeaderActions>
          <Button type="text" icon={<QuestionCircleOutlined />} />
          <Button type="text" icon={<BellOutlined />} />
          <Button type="text" icon={<MenuOutlined />} />
          <UserContainer>
            <Avatar icon={<UserOutlined />} src={user?.avatar} />
            <UserInfo>
              <UserName>Nguyễn Văn A</UserName>
              <UserRole>Admin</UserRole>
            </UserInfo>
          </UserContainer>
        </HeaderActions>
      </HeaderContainer>
      
      <PageTitle>
        ShineWay - Hệ thống hỗ trợ vận hành nhà hàng
      </PageTitle>
      
      <MainContent>
        <ContentBackground>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <StatsContainer>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Select defaultValue="xuất/nhập kho" style={{ width: 180 }}>
                      <Select.Option value="xuất/nhập kho">Xuất / Nhập kho</Select.Option>
                    </Select>
                  </Col>
                  <Col>
                    <Button icon={<CalendarOutlined />} />
                  </Col>
                </Row>
                
                <div style={{ marginTop: 16 }}>
                  <div>Ngày: 19/08/2025</div>
                  <div>Nhập kho: <span style={{ color: 'red' }}>1.090.000đ</span></div>
                  <div>Xuất kho: <span style={{ color: 'green' }}>520.000đ</span></div>
                </div>
                
                <div style={{ height: 100, background: '#f5f5f5', marginTop: 16, borderRadius: 4 }}>
                  {/* Biểu đồ placeholder */}
                </div>
                
                <div style={{ textAlign: 'right', marginTop: 8 }}>
                  <Button type="primary">Chi tiết</Button>
                </div>
              </StatsContainer>
            </Col>
            
            <Col span={18}>
              <div>
                <Title level={4} style={{ color: 'white', marginBottom: 16 }}>Tất cả ứng dụng</Title>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <BarChartOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Doanh thu</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <ShopOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Thực đơn</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <DatabaseOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Hạ tầng</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <BarChartOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Lương</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <DatabaseOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Kho</AppLabel>
                    </AppCard>
                  </Col>
                </Row>
                
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <SettingOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Cài đặt</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <TeamOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Nhân sự</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <FileTextOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Hóa đơn</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <UserOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Phản hồi</AppLabel>
                    </AppCard>
                  </Col>
                  <Col span={4}>
                    <AppCard>
                      <AppIcon>
                        <SwapOutlined style={{ color: '#1890ff' }} />
                      </AppIcon>
                      <AppLabel>Ca làm</AppLabel>
                    </AppCard>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </ContentBackground>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
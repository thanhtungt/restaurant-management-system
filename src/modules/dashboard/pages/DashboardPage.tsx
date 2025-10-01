import React from 'react';
import { Typography, Input, Select, Button, Avatar } from 'antd';
import { 
  SearchOutlined,
  BellOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';
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

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const StyledSearch = styled(Search)`
  min-width: 280px;
  max-width: 480px;
  flex: 1;

  .ant-input-affix-wrapper {
    border-radius: 999px !important;
    background: #ffffff;
    border: 2px solid #61a8ff;
    padding: 0 18px;
    height: 44px;
    box-shadow: 0 6px 18px rgba(45, 124, 237, 0.18);
    transition: all 0.2s ease;
  }

  .ant-input {
    background: transparent;
    font-size: 14px;
    color: #1f2937;
    font-weight: 500;
  }

  .ant-input::placeholder {
    color: #6b7280;
  }

  .ant-input-prefix {
    color: #1d8fff;
    font-size: 16px;
  }

  .ant-input-affix-wrapper-focused {
    border-color: #1d8fff !important;
    box-shadow: 0 0 0 3px rgba(29, 143, 255, 0.2);
  }
`;

const DashboardContainer = styled.div`
  background-color: #f7faff;
  min-height: 100vh;
  padding: 0;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 36px;
  padding: 18px 56px;
  background-color: #ffffff;
  box-shadow: 0 6px 24px rgba(23, 73, 151, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  color: #0088FF;
  line-height: 100%;
  letter-spacing: 0%;
  width: 175px;
  height: 44px;
  display: flex;
  align-items: center;
  opacity: 1;
  text-shadow: 0 8px 18px rgba(24, 110, 255, 0.26);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d8e4fb;
  color: #2b478b;
  background: #f5f9ff;
  box-shadow: 0 4px 12px rgba(30, 100, 200, 0.12);

  &:hover,
  &:focus {
    color: #0f70f5 !important;
    border-color: #0f70f5 !important;
    background: #ffffff !important;
  }
`;

const ActionDivider = styled.div`
  width: 1px;
  height: 36px;
  background: #d8e4fb;
  border-radius: 1px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #d8e4fb;
  background: #ffffff;
  box-shadow: 0 6px 16px rgba(25, 80, 170, 0.08);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(25, 80, 170, 0.18);
    transform: translateY(-2px);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #262626;
  line-height: 1.4;
`;

const UserRole = styled.div`
  background: linear-gradient(135deg, #ffd86a 0%, #ffa000 100%);
  color: white;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 11px;
  text-align: center;
  font-weight: 600;
  margin-top: 2px;
  box-shadow: 0 4px 10px rgba(255, 160, 0, 0.28);
`;

const PageTitle = styled.div`
  padding: 40px 24px 32px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #262626;
  letter-spacing: 0%;
  line-height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const PageTitleHighlight = styled.span`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #1c7cf4;
`;

const MainContent = styled.div`
  padding: 0 64px 56px;
  display: flex;
  justify-content: center;

  @media (max-width: 992px) {
    padding: 0 24px 40px;
  }
`;

const ContentBackground = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  background: linear-gradient(135deg, #4d94f0 0%, #5fa7ff 100%);
  border-radius: 36px;
  padding: 48px 56px;
  color: #ffffff;
  box-shadow: 0 32px 65px rgba(34, 99, 191, 0.22);
  display: flex;
  align-items: stretch;
  gap: 48px;
  flex-wrap: nowrap;

  @media (max-width: 1350px) {
    flex-wrap: wrap;
    padding: 40px 40px;
    gap: 36px;
  }

  @media (max-width: 768px) {
    padding: 28px;
  }
`;

const LeftPanel = styled.div`
  flex: 0 0 360px;
  max-width: 360px;
  background: #ffffff;
  border-radius: 28px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #1d2939;
  box-shadow: 0 20px 45px rgba(32, 87, 175, 0.16);

  @media (max-width: 1350px) {
    flex: 1;
    max-width: 100%;
  }
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledSelect = styled(Select)`
  flex: 1;

  .ant-select-selector {
    border-radius: 16px !important;
    height: 48px !important;
    padding: 0 18px !important;
    border: 1.5px solid #d8e4fb !important;
    box-shadow: 0 6px 14px rgba(41, 106, 214, 0.1);
    background: #ffffff !important;
  }

  .ant-select-selection-item {
    font-weight: 600;
    font-size: 14px;
    color: #1d2939;
  }

  .ant-select-arrow {
    color: #1d2939 !important;
    font-size: 12px;
  }
`;

const CalendarButton = styled(Button)`
  width: 48px;
  height: 48px;
  border-radius: 16px !important;
  border: 1.5px solid #d8e4fb;
  color: #1c7cf4;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 6px 14px rgba(41, 106, 214, 0.1);

  &:hover,
  &:focus {
    color: #ffffff !important;
    background: #1c7cf4 !important;
    border-color: #1c7cf4 !important;
  }
`;

const StatsCard = styled.div`
  background: #ffffff;
  border-radius: 22px;
  padding: 20px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid #e4ecfb;
  box-shadow: 0 12px 20px rgba(27, 78, 150, 0.08);
`;

const StatDate = styled.div`
  font-size: 14px;
  color: #2563eb;
  font-weight: 600;

  strong {
    color: #0f172a;
    font-weight: 700;
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #475467;
  font-weight: 600;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;

  &.income {
    color: #ff2d2d;
  }

  &.expense {
    color: #16b55d;
  }
`;

const ChartContainer = styled.div`
  height: 150px;
  padding: 14px 10px 12px;
  background: #f5f9ff;
  border-radius: 14px;
  border: 1px solid #e0e9fb;
  position: relative;
  overflow: hidden;
`;

const DetailButton = styled(Button)`
  align-self: flex-end;
  padding: 0 18px;
  background: linear-gradient(135deg, #4c9cff 0%, #1c7cf4 100%);
  border-color: transparent;
  color: #ffffff;
  border-radius: 12px;
  font-size: 13px;
  height: 36px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #3f8fff 0%, #1762c7 100%);
    border-color: transparent;
    color: #ffffff;
  }
`;

const DividerVertical = styled.div`
  width: 1px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 1px;
  min-height: 100%;
  align-self: stretch;

  @media (max-width: 1350px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  min-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 18px;

  @media (max-width: 768px) {
    min-width: 100%;
    padding-left: 0;
  }
`;

const AppsTitle = styled(Title)`
  && {
    color: #ffffff;
    margin: 4px 0 28px 0;
    font-weight: 600;
  }
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 28px 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(110px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(110px, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, minmax(160px, 1fr));
  }
`;

const AppCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: transform 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    filter: drop-shadow(0 18px 24px rgba(10, 58, 125, 0.25));
  }
`;

const AppCard = styled.div`
  background-color: #ffffff;
  border-radius: 22px;
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 18px 34px rgba(8, 54, 120, 0.25);
  transition: transform 0.3s ease;

  svg {
    filter: drop-shadow(0 6px 10px rgba(25, 90, 169, 0.22));
  }

  @media (max-width: 1024px) {
    width: 84px;
    height: 84px;
  }
`;

const AppLabel = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  line-height: 1.35;
  letter-spacing: 0.3px;
`;

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <DashboardContainer>
      <HeaderContainer>
        <Logo>ShineWay</Logo>
        <StyledSearch
          placeholder="Tìm kiếm ứng dụng, báo cáo..."
          prefix={<SearchOutlined />}
          allowClear
        />
        <HeaderActions>
          <ActionButtons>
            <IconButton type="default" icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />} />
            <IconButton type="default" icon={<BellOutlined style={{ fontSize: 18 }} />} />
            <IconButton type="default" icon={<MenuOutlined style={{ fontSize: 18 }} />} />
          </ActionButtons>
          <ActionDivider />
          <UserContainer>
            <Avatar size={44} style={{ backgroundColor: '#0088ff' }} icon={<UserOutlined />} />
            <UserInfo>
              <UserName>{user?.name || 'Nguyễn Văn A'}</UserName>
              <UserRole>Admin</UserRole>
            </UserInfo>
          </UserContainer>
        </HeaderActions>
      </HeaderContainer>
      
      <PageTitle>
        <PageTitleHighlight>ShineWay</PageTitleHighlight> - Hệ thống hỗ trợ vận hành nhà hàng
      </PageTitle>
      
      <MainContent>
        <ContentBackground>
          <LeftPanel>
            <ControlRow>
              <StyledSelect defaultValue="warehouse" suffixIcon={<span style={{ fontSize: 12 }}>▼</span>}>
                <Option value="warehouse">Xuất / Nhập kho</Option>
                <Option value="revenue">Doanh thu</Option>
                <Option value="cost">Chi phí</Option>
              </StyledSelect>
              <CalendarButton icon={<CalendarOutlined />} />
            </ControlRow>

            <StatsCard>
              <StatDate>
                Ngày: <strong>19/08/2025</strong>
              </StatDate>
              <StatRow>
                <StatLabel>Nhập kho:</StatLabel>
                <StatValue className="income">1.090.000đ</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Xuất kho:</StatLabel>
                <StatValue className="expense">520.000đ</StatValue>
              </StatRow>

              <ChartContainer>
                <svg width="100%" height="100%" viewBox="0 0 300 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#E53935', stopOpacity: 0.18 }} />
                      <stop offset="100%" style={{ stopColor: '#E53935', stopOpacity: 0 }} />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#2BB673', stopOpacity: 0.18 }} />
                      <stop offset="100%" style={{ stopColor: '#2BB673', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="35" x2="300" y2="35" stroke="#CBD5F5" strokeWidth="0.5" opacity="0.5" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="#CBD5F5" strokeWidth="0.5" opacity="0.5" />
                  <line x1="0" y1="105" x2="300" y2="105" stroke="#CBD5F5" strokeWidth="0.5" opacity="0.5" />

                  <text x="18" y="132" fontSize="10" fill="#7b8ab1" fontFamily="Inter">19/7/2025</text>
                  <text x="244" y="132" fontSize="10" fill="#7b8ab1" fontFamily="Inter">19/8/2025</text>

                  <path
                    d="M 20,90 L 60,58 L 100,92 L 140,45 L 180,70 L 220,34 L 260,50 L 280,40"
                    fill="none"
                    stroke="#E53935"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 20,90 L 60,58 L 100,92 L 140,45 L 180,70 L 220,34 L 260,50 L 280,40 L 280,135 L 20,135 Z"
                    fill="url(#incomeGradient)"
                  />

                  <path
                    d="M 20,110 L 60,100 L 100,118 L 140,80 L 180,95 L 220,78 L 260,92 L 280,72"
                    fill="none"
                    stroke="#2BB673"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 20,110 L 60,100 L 100,118 L 140,80 L 180,95 L 220,78 L 260,92 L 280,72 L 280,135 L 20,135 Z"
                    fill="url(#expenseGradient)"
                  />
                </svg>
              </ChartContainer>
              <DetailButton type="primary">
                Chi tiết <span style={{ marginLeft: 6 }}>→</span>
              </DetailButton>
            </StatsCard>
          </LeftPanel>

          <DividerVertical />

          <RightPanel>
            <AppsTitle level={4}>Tất cả ứng dụng</AppsTitle>
            <AppGrid>
              <AppCardWrapper>
                <AppCard>
                  <RevenueIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Doanh thu</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <MenuIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Thực đơn</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <InfrastructureIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Hạ tầng</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <SalaryIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Lương</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <WarehouseIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Kho</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <SettingsIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Cài đặt</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <StaffIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Nhân sự</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <InvoiceIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Hóa đơn</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <FeedbackIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Phản hồi</AppLabel>
              </AppCardWrapper>
              <AppCardWrapper>
                <AppCard>
                  <ShiftIcon width={46} height={46} />
                </AppCard>
                <AppLabel>Ca làm</AppLabel>
              </AppCardWrapper>
            </AppGrid>
          </RightPanel>
        </ContentBackground>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
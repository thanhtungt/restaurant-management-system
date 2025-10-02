import React, { useState } from 'react';
import { Card, Row, Col, Button, Space, Tabs, Badge, Dropdown, Menu, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Table } from '../../../types/table';
import MenuItems from '../../menu/components/MenuItems';
import OrderDetails from '../../order/components/OrderDetails';

const { TabPane } = Tabs;
const { Option } = Select;

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
`;

const TableButton = styled(Button)<{ status: string }>`
  width: 100%;
  height: 60px;
  background: ${props => props.status === 'empty' ? '#f0f0f0' : 
    props.status === 'inUse' ? '#1890ff' : '#f5222d'};
  color: ${props => props.status === 'empty' ? 'rgba(0, 0, 0, 0.65)' : '#fff'};
`;

const mockTables: Table[] = Array.from({ length: 24 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: `B${Math.floor(i / 8) + 1}`,
  status: i % 3 === 0 ? 'empty' : i % 5 === 0 ? 'reserved' : 'inUse',
  floor: 1,
}));

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0;
`;

const TableManagementPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [activeTab, setActiveTab] = useState('1');

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setActiveTab('1'); // Switch to menu tab when selecting a table
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Quản lý bàn</PageTitle>
      </PageHeader>
      
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Danh mục các món">
            <Space style={{ marginBottom: 16 }}>
              <Button type="primary">Tất cả</Button>
              <Button>Đồ nhậu</Button>
              <Button>Lẩu</Button>
              <Button>Đồ nướng</Button>
              <Button>Đồ uống</Button>
            </Space>
            
            <MenuItems />
          </Card>
          
          <Card title="Chọn bàn" style={{ marginTop: 16 }}>
            <Space style={{ marginBottom: 16 }}>
              <Select defaultValue="1" style={{ width: 120 }}>
                <Option value="1">Tầng 1</Option>
                <Option value="2">Tầng 2</Option>
              </Select>
              
              <Space>
                <Badge color="#f0f0f0" text="Đang trống" />
                <Badge color="#1890ff" text="Đang dùng" />
                <Badge color="#f5222d" text="Đặt trước" />
                <Badge color="#52c41a" text="Đang chọn" count={14} />
              </Space>
            </Space>
            
            <TableGrid>
              {mockTables.map(table => (
                <TableButton 
                  key={table.id}
                  status={table.status}
                  onClick={() => handleTableClick(table)}
                  type={selectedTable?.id === table.id ? 'primary' : 'default'}
                >
                  {table.number}
                </TableButton>
              ))}
            </TableGrid>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card>
            <OrderDetails table={selectedTable} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TableManagementPage;